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
import { InventoryService } from './inventory.service';
import { ItemCategory, ResourceItemType } from '../types/entity.type';
import type { IInventoryService } from '../types/service.type';
import type { IItemRepository } from '../types/repository.type';

describe('InventoryService', () => {
	const mockItem = {
		id: '1',
		name: 'Mock Cloth',
		category: ItemCategory.Resource,
		type: ResourceItemType.Cloth,
		tier: 99,
		imageUrl: 'https://render.albiononline.com/v1/item/Mock%20Cloth.png'
	};

	let fakeItemRepository: {
		findById: MockInstance<[string], Item | null>;
	};

	let inventoryService: IInventoryService;

	beforeAll(() => {
		fakeItemRepository = {
			findById: vi.fn()
		};
	});
	beforeEach(() => {
		fakeItemRepository.findById.mockImplementation((id) => {
			if (id === '1') return new Item(mockItem);
			return null;
		});

		inventoryService = new InventoryService(fakeItemRepository as unknown as IItemRepository);
	});
	afterEach(() => {
		vi.resetAllMocks();
	});
	afterAll(() => {
		vi.restoreAllMocks();
	});

	describe('getItems', () => {
		it('should return an empty array when no items are added', () => {
			const items = inventoryService.getItems();
			expect(items).toEqual([]);
		});

		it('should return items with their quantities when items are added', () => {
			inventoryService.upsertItemQuantity('1', 10);

			const items = inventoryService.getItems();
			expect(items).toEqual([{ ...mockItem, quantity: 10 }]);
		});
	});

	describe('upsertItemQuantity', () => {
		it('should add a new item if it does not exist', () => {
			inventoryService.upsertItemQuantity('1', 5);

			const items = inventoryService.getItems();
			expect(items).toContainEqual({ ...mockItem, quantity: 5 });
		});

		it('should remove the item if quantity is zero', () => {
			inventoryService.upsertItemQuantity('1', 4);
			inventoryService.upsertItemQuantity('1', 0);

			const items = inventoryService.getItems();
			expect(items).toEqual([]);
		});

		it('should replace the quantity of an existing item', () => {
			inventoryService.upsertItemQuantity('1', 5);
			inventoryService.upsertItemQuantity('1', 3);

			const items = inventoryService.getItems();
			expect(items).toContainEqual({ ...mockItem, quantity: 3 });
		});

		it('should not add an item if the item is not found in the repository', () => {
			inventoryService.upsertItemQuantity('non-existent-id', 4);

			const items = inventoryService.getItems();
			expect(items).toEqual([]);
		});

		it('should not add an item if the quantity is a negative number', () => {
			inventoryService.upsertItemQuantity('1', -4);

			const items = inventoryService.getItems();
			expect(items).toEqual([]);
		});
	});

	describe('removeItem', () => {
		it('should remove the existing item from inventory', () => {
			inventoryService.upsertItemQuantity('1', 10);

			inventoryService.removeItem('1');

			const items = inventoryService.getItems();
			expect(items).toEqual([]);
		});

		it('should not affect the inventory if the item does not exist', () => {
			inventoryService.upsertItemQuantity('1', 10);

			inventoryService.removeItem('non-existent-id');

			const items = inventoryService.getItems();
			expect(items).toEqual([{ ...mockItem, quantity: 10 }]);
		});
	});
});
