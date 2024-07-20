import { initialItemRepository } from '../repositories/item.repository';
import type { IItem } from '../types/entity.type';
import type { IInventoryService, ItemWithQuantity } from '../types/service.type';

export class InventoryService implements IInventoryService {
	constructor(private itemRepository = initialItemRepository()) {}

	private items: Map<string, { item: IItem; quantity: number }> = new Map();

	getItems(): ItemWithQuantity[] {
		return Array.from(this.items.values()).map(({ item, quantity }) => ({
			...item.toObject(),
			quantity
		}));
	}
	addItem(itemId: string, quantity = 1): void {
		const existingItem = this.items.get(itemId);
		if (existingItem) {
			existingItem.quantity += quantity;
		} else {
			const item = this.itemRepository.findById(itemId);
			if (item) {
				this.items.set(itemId, { item: item, quantity });
			}
		}
	}
	removeItem(itemId: string, quantity = 1): void {
		const existingItem = this.items.get(itemId);
		if (existingItem) {
			if (existingItem.quantity <= quantity) {
				this.items.delete(itemId);
			} else {
				existingItem.quantity -= quantity;
			}
		}
	}
}
export function initialInventoryService(): IInventoryService {
	return new InventoryService();
}
