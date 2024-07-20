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
import { ItemRepository } from '../repositories/item.repository';
import { initialInventoryService } from './inventory.service';
import { ItemCategory, ResourceItemType } from '../types/entity.type';
import type { IInventoryService } from '../types/service.type';

describe('InventoryService', () => {
	const mockItem = {
		id: '1',
		name: 'Mock Cloth',
		category: ItemCategory.Resource,
		type: ResourceItemType.Cloth,
		tier: 99,
		imageUrl: 'https://render.albiononline.com/v1/item/Mock%20Cloth.png'
	};

	let InventoryService: IInventoryService;
	let mockItemRepository: {
		findById: MockInstance<[string], Item | null>;
	};

	beforeAll(() => {
		mockItemRepository = {
			findById: vi.spyOn(ItemRepository.prototype, 'findById')
		};
	});
	beforeEach(() => {
		InventoryService = initialInventoryService();
		mockItemRepository.findById.mockImplementation((id) => {
			if (id === '1') return new Item(mockItem);
			return null;
		});
	});
	afterEach(() => {
		vi.resetAllMocks();
	});
	afterAll(() => {
		vi.restoreAllMocks();
	});

	describe('getItems', () => {
		it('should return an empty array when no items are added', () => {
			const items = InventoryService.getItems();
			expect(items).toEqual([]);
		});

		it('should return items with their quantities when items are added', () => {
			InventoryService.addItem('1', 10);

			const items = InventoryService.getItems();
			expect(items).toEqual([{ ...mockItem, quantity: 10 }]);
		});
	});

	describe('addItem', () => {
		it('should add a new item if it does not exist', () => {
			InventoryService.addItem('1', 5);

			const items = InventoryService.getItems();
			expect(items).toContainEqual({ ...mockItem, quantity: 5 });
		});

		it('should increase the quantity of an existing item', () => {
			InventoryService.addItem('1', 5);
			InventoryService.addItem('1', 3);

			const items = InventoryService.getItems();
			expect(items).toContainEqual({ ...mockItem, quantity: 8 });
		});

		it('should not add an item if the item is not found in the repository', () => {
			InventoryService.addItem('non-existent-id');

			const items = InventoryService.getItems();
			expect(items).toEqual([]);
		});
	});

	describe('removeItem', () => {
		it('should decrease the quantity of an existing item', () => {
			InventoryService.addItem('1', 10);

			InventoryService.removeItem('1', 4);

			const items = InventoryService.getItems();
			expect(items).toContainEqual({ ...mockItem, quantity: 6 });
		});

		it('should remove the item if the quantity to remove is greater than or equal to the quantity in inventory', () => {
			InventoryService.addItem('1', 10);

			InventoryService.removeItem('1', 10);

			const items = InventoryService.getItems();
			expect(items).toEqual([]);
		});

		it('should not affect the inventory if the item does not exist', () => {
			InventoryService.removeItem('non-existent-id', 5);

			const items = InventoryService.getItems();
			expect(items).toEqual([]);
		});
	});
});
