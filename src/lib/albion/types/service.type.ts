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
	items: ItemInCatalog[];
};
type ItemInCatalog = {
	id: string;
	category: string;
	type: string;
	tier: number;
	name: string;
	imageUrl: string;
};

export interface IInventoryService {
	getItems(): ItemsInInventory;
	addItem(itemId: string, quantity?: number): void;
	removeItem(itemId: string, quantity?: number): void;
}
export type ItemsInInventory = ItemInInventory[];
type ItemInInventory = {
	id: string;
	category: string;
	type: string;
	tier: number;
	name: string;
	imageUrl: string;
	quantity: number;
};
