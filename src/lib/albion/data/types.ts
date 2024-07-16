export interface IRawItemData {
	category: string;
	type: string;
	tier: number;
	name: string;
	craftingOptions: Record<string, number>[] | null;
}
export interface IRawItemCategoryData {
	name: string;
	types: Record<string, IRawItemTypeData>;
}
export interface IRawItemTypeData {
	name: string;
}
