// ItemCatalogService.test.ts
import { afterEach } from 'node:test';
import {
	afterAll,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
	vi,
	type MockInstance
} from 'vitest';
import { ItemCategory } from '../entities/item-category.entity';
import { Item } from '../entities/item.entity';
import {
	ItemCategory as ItemCategoryEnum,
	MagicItemType,
	ResourceItemType
} from '../types/entity.type';
import type { IItemCatalogService, ItemsGroupedByCategoryAndType } from '../types/service.type';
import { ItemCatalogService } from './item-catalog.service';
import type { IItemCategoryRepository, IItemRepository } from '../types/repository.type';

describe('ItemCatalogService', () => {
	const mockCategories = [
		{
			id: ItemCategoryEnum.Resource,
			name: 'Mock Resource'
		},
		{
			id: ItemCategoryEnum.Magic,
			name: 'Mock Magic'
		}
	];
	const mockTypes = [
		{ category: ItemCategoryEnum.Resource, id: ResourceItemType.Wood, name: 'Mock Wood' },
		{ category: ItemCategoryEnum.Resource, id: ResourceItemType.Brick, name: 'Mock Brick' },
		{ category: ItemCategoryEnum.Magic, id: MagicItemType.FrostStaff, name: 'Mock Frost staff' }
	];
	const mockItems = [
		{
			id: '1',
			name: 'Mock Wood Item',
			category: ItemCategoryEnum.Resource,
			type: ResourceItemType.Wood,
			tier: 99,
			imageUrl: 'https://render.albiononline.com/v1/item/Mock%20Wood%20Item.png'
		},
		{
			id: '2',
			name: 'Mock Brick Item',
			category: ItemCategoryEnum.Resource,
			type: ResourceItemType.Brick,
			tier: 99,
			imageUrl: 'https://render.albiononline.com/v1/item/Mock%20Brick%20Item.png'
		},
		{
			id: '3',
			name: 'Mock Brick Item',
			category: ItemCategoryEnum.Resource,
			type: ResourceItemType.Brick,
			tier: 99,
			imageUrl: 'https://render.albiononline.com/v1/item/Mock%20Brick%20Item.png'
		},
		{
			id: '4',
			name: 'Mock FrostStaff Item',
			category: ItemCategoryEnum.Magic,
			type: MagicItemType.FrostStaff,
			tier: 99,
			imageUrl: 'https://render.albiononline.com/v1/item/Mock%20FrostStaff%20Item.png'
		}
	];

	let fakeItemCategoryRepository: {
		findAll: MockInstance<never, ItemCategory[]>;
	};
	let fakeItemRepository: {
		findAll: MockInstance<never, Item[]>;
	};

	let itemCatalogService: IItemCatalogService;

	beforeAll(() => {
		fakeItemCategoryRepository = {
			findAll: vi.fn<never, ItemCategory[]>()
		};
		fakeItemRepository = {
			findAll: vi.fn<never, Item[]>()
		};
	});
	beforeEach(() => {
		fakeItemCategoryRepository.findAll.mockReturnValue(
			mockCategories.map(
				(category) =>
					new ItemCategory({
						...category,
						types: mockTypes
							.filter(({ category: categoryId }) => categoryId === category.id)
							.reduce(
								(obj, type) => ({
									...obj,
									[type.id]: type
								}),
								{}
							)
					})
			)
		);
		fakeItemRepository.findAll.mockReturnValue(mockItems.map((item) => new Item(item)));

		itemCatalogService = new ItemCatalogService(
			fakeItemCategoryRepository as unknown as IItemCategoryRepository,
			fakeItemRepository as unknown as IItemRepository
		);
	});
	afterEach(() => {
		vi.resetAllMocks();
	});
	afterAll(() => {
		vi.restoreAllMocks();
	});

	it('should return items grouped by category and type', () => {
		const expectedResult = [
			{
				id: ItemCategoryEnum.Resource,
				name: 'Mock Resource',
				types: [
					{
						id: ResourceItemType.Wood,
						name: 'Mock Wood',
						items: [mockItems[0]]
					},
					{
						id: ResourceItemType.Brick,
						name: 'Mock Brick',
						items: [mockItems[1], mockItems[2]]
					}
				]
			},
			{
				id: ItemCategoryEnum.Magic,
				name: 'Mock Magic',
				types: [
					{
						id: MagicItemType.FrostStaff,
						name: 'Mock Frost staff',
						items: [mockItems[3]]
					}
				]
			}
		];

		const result = itemCatalogService.getItemsByGroupingWithCategoryAndType();

		expect(result).toEqual(expectedResult);
	});

	it('should return empty result when no categories and items are available', () => {
		fakeItemCategoryRepository.findAll.mockReturnValue([]);
		fakeItemRepository.findAll.mockReturnValue([]);

		const expectedResult: ItemsGroupedByCategoryAndType = [];

		const result = itemCatalogService.getItemsByGroupingWithCategoryAndType();

		expect(result).toEqual(expectedResult);
	});

	it('should handle cases where there are categories but no items', () => {
		fakeItemRepository.findAll.mockReturnValue(
			mockItems.filter((item) => item.type !== ResourceItemType.Brick).map((item) => new Item(item))
		);

		const expectedResult = [
			{
				id: ItemCategoryEnum.Resource,
				name: 'Mock Resource',
				types: [
					{
						id: ResourceItemType.Wood,
						name: 'Mock Wood',
						items: [mockItems[0]]
					},
					{
						id: ResourceItemType.Brick,
						name: 'Mock Brick',
						items: []
					}
				]
			},
			{
				id: ItemCategoryEnum.Magic,
				name: 'Mock Magic',
				types: [
					{
						id: MagicItemType.FrostStaff,
						name: 'Mock Frost staff',
						items: [mockItems[3]]
					}
				]
			}
		];

		const result = itemCatalogService.getItemsByGroupingWithCategoryAndType();

		expect(result).toEqual(expectedResult);
	});
});
