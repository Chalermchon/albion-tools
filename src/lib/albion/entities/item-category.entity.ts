import type { IItemCategory, IItemType } from '../types/entity.type';

type ItemCategoryArgument = {
	id: string;
	name: string;
	types: Record<string, { name: string }>;
};
export class ItemCategory implements IItemCategory {
	private _id!: string;
	private _types!: Record<string, { name: string }>;
	private _name!: string;

	constructor({ id, name, types }: ItemCategoryArgument) {
		this._id = id;
		this._name = name;
		this._types = types;
	}

	public get id(): string {
		return this._id;
	}
	public get name(): string {
		return this._name;
	}
	public get types(): IItemType[] {
		return Object.entries(this._types).map(([id, type]) => ({ id, name: type.name }));
	}

	public toObject() {
		return {
			id: this.id,
			name: this.name,
			types: this.types
		};
	}
}
