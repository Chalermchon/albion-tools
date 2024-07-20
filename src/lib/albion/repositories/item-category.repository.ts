import { ItemCategoryData } from '../data/item-categories';
import { ItemCategory } from '../entities/item-category.entity';
import type { IItemCategoryRepository } from '../types/repository.type';

export class ItemCategoryRepository implements IItemCategoryRepository {
	findAll(): ItemCategory[] {
		return Object.entries(ItemCategoryData).map(([id, category]) => {
			return new ItemCategory({ id, ...category });
		});
	}
}
export function initialItemCategoryRepository(): IItemCategoryRepository {
	return new ItemCategoryRepository();
}
