import type { IItem } from '../types/entity.type';
import type { IItemRepository } from '../types/repository.type';
import type { IInventoryService, ItemWithQuantity } from '../types/service.type';

export class InventoryService implements IInventoryService {
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
}
export function initialInventoryService(itemRepository: IItemRepository): IInventoryService {
	return new InventoryService(itemRepository);
}
