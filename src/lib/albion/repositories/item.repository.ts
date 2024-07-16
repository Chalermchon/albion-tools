import { ItemData } from '../data/items';
import { Item } from '../entities/item.entity';
import type { IItemRepository } from '../types/repository.type';

class ItemRepository implements IItemRepository {
	findAll(): Item[] {
		return Object.entries(ItemData).map(([id, item]) => {
			return new Item({ id, ...item });
		});
	}
}
export default new ItemRepository();
