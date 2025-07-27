import type { IItem } from '../types/entity.type';
import type { IItemRepository } from '../types/repository.type';
import type { ICraftingService, ItemWithQuantity } from '../types/service.type';

export class CraftingService implements ICraftingService {
	constructor(private itemRepository: IItemRepository) {}

	private items: Map<string, { item: IItem; quantity: number }> = new Map();

	getItems(): ItemWithQuantity[] {
		return Array.from(this.items.values()).map(({ item, quantity }) => ({
			...item.toObject(),
			quantity
		}));
	}
	upsertItemQuantity(itemId: string, quantity: number): void {
		if (quantity <= 0) {
			this.items.delete(itemId);
		} else {
			const existingItem = this.items.get(itemId);
			if (existingItem) {
				existingItem.quantity = quantity;
			} else {
				const item = this.itemRepository.findById(itemId);
				if (item) {
					this.items.set(itemId, { item: item, quantity });
				}
			}
		}
	}
	removeItem(itemId: string): void {
		this.items.delete(itemId);
	}
	getRequiredItems(existingItems: Record<string, number> = {}): ItemWithQuantity[] {
		const allRequiredItems: Map<string, ItemWithQuantity> = new Map();

		const addRequiredItems = (itemId: string, quantity: number) => {
			const existingQuantity = existingItems[itemId] ?? 0;
			const neededQuantity = quantity - existingQuantity;
			if (neededQuantity > 0) {
				const item = this.itemRepository.findById(itemId);
				if (item) {
					const requiredItems = item.getRequiredItems();
					if (!requiredItems) {
						allRequiredItems.set(itemId, {
							...item.toObject(),
							quantity: (allRequiredItems.get(itemId)?.quantity ?? 0) + neededQuantity
						});
					} else {
						for (const [itemId, quantity] of Object.entries(requiredItems)) {
							addRequiredItems(itemId, neededQuantity * quantity);
						}
					}
				}
			}
		};

		for (const { item, quantity } of this.items.values()) {
			addRequiredItems(item.id, quantity);
		}

		return Array.from(allRequiredItems.values());
	}
}
export function initialCraftingService(itemRepository: IItemRepository) {
	return new CraftingService(itemRepository);
}
