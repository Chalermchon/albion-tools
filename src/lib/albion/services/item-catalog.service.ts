import ItemCategoryRepository from '../repositories/item-category.repository';
import ItemRepository from '../repositories/item.repository';
import type { IItemCatalogService, ItemsGroupedByCategoryAndType } from '../types/service.type';

class ItemCatalogService implements IItemCatalogService {
	getItemsByGroupingWithCategoryAndType(): ItemsGroupedByCategoryAndType {
		const categories = ItemCategoryRepository.findAll();
		const items = ItemRepository.findAll();

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
export default new ItemCatalogService();
