export interface IItemCatalogService {
	getItemsByGroupingWithCategoryAndType(): ItemsGroupedByCategoryAndType;
}
export type ItemsGroupedByCategoryAndType = ItemCategory[];
type ItemCategory = {
	id: string;
	name: string;
	types: ItemType[];
};
type ItemType = {
	id: string;
	name: string;
	items: Item[];
};
type Item = {
	id: string;
	category: string;
	type: string;
	tier: number;
	name: string;
	imageUrl: string;
};
