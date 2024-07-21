import {
	afterAll,
	afterEach,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
	vi,
	type MockInstance
} from 'vitest';
import { Item } from '../entities/item.entity';
import { CraftingService } from './crafting.service';
import { ItemCategory, ResourceItemType } from '../types/entity.type';
import type { ICraftingService } from '../types/service.type';
import type { IItemRepository } from '../types/repository.type';

describe('CraftingService', () => {
	const mockItems: Array<{
		id: string;
		name: string;
		category: string;
		type: string;
		tier: number;
		imageUrl: string;
		requiredItems?: Record<string, number>;
	}> = [
		{
			id: '1',
			name: 'Mock Cloth',
			category: ItemCategory.Resource,
			type: ResourceItemType.Cloth,
			tier: 4,
			imageUrl: 'https://render.albiononline.com/v1/item/Mock%20Cloth.png',
			requiredItems: {
				'2': 3,
				'3': 7
			}
		},
		{
			id: '2',
			name: 'Mock Fiber 1',
			category: ItemCategory.Resource,
			type: ResourceItemType.Fiber,
			tier: 4,
			imageUrl: 'https://render.albiononline.com/v1/item/Mock%20Fiber%201.png'
		},
		{
			id: '3',
			name: 'Mock Fiber 2',
			category: ItemCategory.Resource,
			type: ResourceItemType.Fiber,
			tier: 4,
			imageUrl: 'https://render.albiononline.com/v1/item/Mock%20Fiber%202.png',
			requiredItems: {
				'4': 8
			}
		},
		{
			id: '4',
			name: 'Mock Fiber 3',
			category: ItemCategory.Resource,
			type: ResourceItemType.Fiber,
			tier: 4,
			imageUrl: 'https://render.albiononline.com/v1/item/Mock%20Fiber%203.png'
		}
	];

	let fakeItemRepository: {
		findById: MockInstance<[string], Item | null>;
	};

	let craftingService: ICraftingService;

	beforeAll(() => {
		fakeItemRepository = {
			findById: vi.fn()
		};
	});
	beforeEach(() => {
		fakeItemRepository.findById.mockImplementation((id) => {
			const index = Number(id) - 1;
			if (mockItems[index])
				return new Item({
					id: mockItems[index].id,
					name: mockItems[index].name,
					category: mockItems[index].category,
					type: mockItems[index].type,
					tier: mockItems[index].tier,
					requiredItems: mockItems[index].requiredItems ?? null
				});
			return null;
		});

		craftingService = new CraftingService(fakeItemRepository as unknown as IItemRepository);
	});
	afterEach(() => {
		vi.resetAllMocks();
	});
	afterAll(() => {
		vi.restoreAllMocks();
	});

	describe('getItems', () => {
		it('should return an empty array when no items are added', () => {
			const items = craftingService.getItems();
			expect(items).toEqual([]);
		});

		it('should return items with their quantities when items are added', () => {
			craftingService.addItem('1', 10);

			const items = craftingService.getItems();

			expect(items).toEqual([
				{
					id: mockItems[0].id,
					category: mockItems[0].category,
					type: mockItems[0].type,
					tier: mockItems[0].tier,
					name: mockItems[0].name,
					imageUrl: mockItems[0].imageUrl,
					quantity: 10
				}
			]);
		});
	});

	describe('addItem', () => {
		it('should add a new item if it does not exist', () => {
			craftingService.addItem('1', 5);

			const items = craftingService.getItems();

			expect(items).toContainEqual({
				id: mockItems[0].id,
				category: mockItems[0].category,
				type: mockItems[0].type,
				tier: mockItems[0].tier,
				name: mockItems[0].name,
				imageUrl: mockItems[0].imageUrl,
				quantity: 5
			});
		});

		it('should increase the quantity of an existing item', () => {
			craftingService.addItem('1', 5);
			craftingService.addItem('1', 3);

			const items = craftingService.getItems();

			expect(items).toContainEqual({
				id: mockItems[0].id,
				category: mockItems[0].category,
				type: mockItems[0].type,
				tier: mockItems[0].tier,
				name: mockItems[0].name,
				imageUrl: mockItems[0].imageUrl,
				quantity: 8
			});
		});

		it('should not add an item if the item is not found in the repository', () => {
			craftingService.addItem('non-existent-id');

			const items = craftingService.getItems();
			expect(items).toEqual([]);
		});
	});

	describe('removeItem', () => {
		it('should decrease the quantity of an existing item', () => {
			craftingService.addItem('1', 10);

			craftingService.removeItem('1', 4);

			const items = craftingService.getItems();
			expect(items).toContainEqual({
				id: mockItems[0].id,
				category: mockItems[0].category,
				type: mockItems[0].type,
				tier: mockItems[0].tier,
				name: mockItems[0].name,
				imageUrl: mockItems[0].imageUrl,
				quantity: 6
			});
		});

		it('should remove the item if the quantity to remove is greater than or equal to the quantity in inventory', () => {
			craftingService.addItem('1', 10);

			craftingService.removeItem('1', 10);

			const items = craftingService.getItems();
			expect(items).toEqual([]);
		});

		it('should remove the item if the quantity to remove is greater than or equal to the quantity in inventory', () => {
			craftingService.addItem('1', 10);

			craftingService.removeItem('1', 10);

			const items = craftingService.getItems();
			expect(items).toEqual([]);
		});

		it('should not affect the inventory if the item does not exist', () => {
			craftingService.removeItem('non-existent-id', 5);

			const items = craftingService.getItems();
			expect(items).toEqual([]);
		});
	});

	describe('getRequiredItems', () => {
		it('should return an empty array when no items for crafting', () => {
			const items = craftingService.getRequiredItems();
			expect(items).toEqual([]);
		});

		it('should return all required items for crafting based on existing items', () => {
			craftingService.addItem('1', 3);

			const existingItems = {
				'2': 2,
				'3': 1
			};

			const result = craftingService.getRequiredItems(existingItems);

			expect(result).toEqual([
				{
					id: mockItems[1].id,
					category: mockItems[1].category,
					type: mockItems[1].type,
					tier: mockItems[1].tier,
					name: mockItems[1].name,
					imageUrl: mockItems[1].imageUrl,
					quantity: 7
				},
				{
					id: mockItems[3].id,
					category: mockItems[3].category,
					type: mockItems[3].type,
					tier: mockItems[3].tier,
					name: mockItems[3].name,
					imageUrl: mockItems[3].imageUrl,
					quantity: 160
				}
			]);
		});

		it('should return all items with their original quantities if no existing items are provided', () => {
			craftingService.addItem('1', 2);

			const result = craftingService.getRequiredItems();

			expect(result).toEqual([
				{
					id: mockItems[1].id,
					category: mockItems[1].category,
					type: mockItems[1].type,
					tier: mockItems[1].tier,
					name: mockItems[1].name,
					imageUrl: mockItems[1].imageUrl,
					quantity: 6
				},
				{
					id: mockItems[3].id,
					category: mockItems[3].category,
					type: mockItems[3].type,
					tier: mockItems[3].tier,
					name: mockItems[3].name,
					imageUrl: mockItems[3].imageUrl,
					quantity: 112
				}
			]);
		});
	});
});
