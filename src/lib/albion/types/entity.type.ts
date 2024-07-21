export interface IItemCategory {
	id: string;
	name: string;
	types: IItemType[];

	toObject(): {
		id: string;
		name: string;
		types: IItemType[];
	};
}
export interface IItemType {
	id: string;
	name: string;
}

export interface IItem {
	id: string;
	category: ItemCategory;
	type: ItemType;
	tier: number;
	name: string;
	imageUrl: string;

	toObject(): {
		id: string;
		category: ItemCategory;
		type: ItemType;
		tier: number;
		name: string;
		imageUrl: string;
	};
	getRequiredItems(): Record<string, number> | null;
}
export enum ItemCategory {
	Resource = 'resource',
	Magic = 'magic'
}
export type ItemType = ResourceItemType | MagicItemType;
export enum ResourceItemType {
	Wood = 'wood',
	Stone = 'stone',
	Hide = 'hide',
	Fiber = 'fiber',
	Ore = 'ore',
	Plank = 'plank',
	Brick = 'brick',
	Leather = 'leather',
	Cloth = 'cloth',
	Metal = 'metal'
}
export enum MagicItemType {
	FrostStaff = 'frost_staff'
}
