import {
	ItemCategory,
	MagicItemType,
	ResourceItemType,
	type IItem,
	type ItemType
} from '../types/entity.type';

type ItemArgument = {
	id: string;
	category: string;
	type: string;
	tier: number;
	name: string;
	requiredItems?: Record<string, number> | null;
};
export class Item implements IItem {
	private _id!: string;
	private _category!: ItemCategory;
	private _type!: ItemType;
	private _tier!: number;
	private _name!: string;
	private _requiredItems!: Record<string, number> | null;

	constructor({ id, category, type, tier, name, requiredItems }: ItemArgument) {
		if (!this.isValidCategory(category)) {
			throw new Error(`${category} is an invalid category`);
		}
		if (!this.isValidType(category, type)) {
			throw new Error(`${type} is an invalid type`);
		}
		this._id = id;
		this._category = category;
		this._type = type;
		this._tier = tier;
		this._name = name;
		this._requiredItems = requiredItems ?? null;
	}

	private isValidCategory(category: string): category is ItemCategory {
		return Object.values(ItemCategory).includes(category as ItemCategory);
	}
	private isValidType(category: ItemCategory, type: string): type is ItemType {
		switch (category) {
			case ItemCategory.Resource:
				return Object.values(ResourceItemType).includes(type as ResourceItemType);
			case ItemCategory.Magic:
				return Object.values(MagicItemType).includes(type as MagicItemType);
			default:
				return false;
		}
	}

	public get id(): string {
		return this._id;
	}
	public get category(): ItemCategory {
		return this._category;
	}
	public get type(): ItemType {
		return this._type;
	}
	public get tier(): number {
		return this._tier;
	}
	public get name(): string {
		return this._name;
	}
	public get imageUrl(): string {
		return new URL(`https://render.albiononline.com/v1/item/${this._name}.png`).toString();
	}

	public toObject() {
		return {
			id: this.id,
			category: this.category,
			type: this.type,
			tier: this.tier,
			name: this.name,
			imageUrl: this.imageUrl
		};
	}

	getRequiredItems() {
		return this._requiredItems;
	}
}
