import type { IItem, IItemCategory } from './entity.type';

export interface IItemCategoryRepository {
	findAll(): IItemCategory[];
}

export interface IItemRepository {
	findAll(): IItem[];
}
