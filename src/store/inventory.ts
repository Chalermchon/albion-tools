import InventoryService from 'lib/albion/services/inventory.service';
import type { ItemsInInventory } from 'lib/albion/types/service.type';
import { writable } from 'svelte/store';

export const inventory = writable<ItemsInInventory>([]);

export function addItemIntoInventory(itemId: string, quantity = 1) {
	InventoryService.addItem(itemId, quantity);
	inventory.update(() => InventoryService.getItems());
}
export function removeItemFromInventory(itemId: string, quantity = 1) {
	InventoryService.removeItem(itemId, quantity);
	inventory.update(() => InventoryService.getItems());
}