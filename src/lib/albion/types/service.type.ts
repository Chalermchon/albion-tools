export interface IItemCatalogService {
	getItemsByGroupingWithCategoryAndType(): ItemsGroupedByCategoryAndType;
}
export interface IInventoryService {
	getItems(): ItemWithQuantity[];
	addItem(itemId: string, quantity?: number): void;
	removeItem(itemId: string, quantity?: number): void;
}
export interface ICraftingService {
	getItems(): ItemWithQuantity[];
	addItem(itemId: string, quantity?: number): void;
	removeItem(itemId: string, quantity?: number): void;
	getRequiredItems(existingItems?: Record<string, number>): ItemWithQuantity[];
}

export type ItemsGroupedByCategoryAndType = Array<{
	id: string;
	name: string;
	types: Array<{
		id: string;
		name: string;
		items: Item[];
	}>;
}>;
export type ItemWithQuantity = {
	id: string;
	category: string;
	type: string;
	tier: number;
	name: string;
	imageUrl: string;
	quantity: number;
};
export type Item = {
	id: string;
	category: string;
	type: string;
	tier: number;
	name: string;
	imageUrl: string;
};
