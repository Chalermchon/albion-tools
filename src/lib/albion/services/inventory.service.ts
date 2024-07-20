import type { Item } from '../entities/item.entity';
import ItemRepository from '../repositories/item.repository';
import type { IInventoryService, ItemWithQuantity } from '../types/service.type';

class InventoryService implements IInventoryService {
	private items: Map<string, { item: Item; quantity: number }> = new Map();

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
			const item = ItemRepository.findById(itemId);
			if (item) {
				this.items.set(itemId, { item, quantity });
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
export default new InventoryService();
