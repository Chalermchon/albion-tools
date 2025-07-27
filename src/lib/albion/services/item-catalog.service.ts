import type { IItemCategoryRepository, IItemRepository } from '../types/repository.type';
import type { IItemCatalogService, ItemsGroupedByCategoryAndType } from '../types/service.type';

export class ItemCatalogService implements IItemCatalogService {
	constructor(
		private itemCategoryRepository: IItemCategoryRepository,
		private itemRepository: IItemRepository
	) {}

	getItemsByGroupingWithCategoryAndType(): ItemsGroupedByCategoryAndType {
		const categories = this.itemCategoryRepository.findAll();
		const items = this.itemRepository.findAll();

		return categories.map((category) => ({
			...category.toObject(),
			types: category.types.map((type) => ({
				id: type.id,
				name: type.name,
				items: items
					.filter((item) => item.category === category.id && item.type === type.id)
					.map((item) => item.toObject())
			}))
		}));
	}
}
export function initialItemCatalogService(
	itemCategoryRepository: IItemCategoryRepository,
	itemRepository: IItemRepository
): IItemCatalogService {
	return new ItemCatalogService(itemCategoryRepository, itemRepository);
}
