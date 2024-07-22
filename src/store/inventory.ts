import { InventoryService } from 'lib/services';
import type { ItemWithQuantity } from 'lib/albion/types/service.type';
import { writable } from 'svelte/store';

export const inventory = writable<ItemWithQuantity[]>([]);

export function updateItemIntoInventory(itemId: string, quantity: number) {
	InventoryService.upsertItemQuantity(itemId, quantity);
	inventory.update(() => InventoryService.getItems());
}
