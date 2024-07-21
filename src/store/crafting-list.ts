import { initialCraftingService } from 'lib/albion/services/crafting.service';
import type { ItemWithQuantity } from 'lib/albion/types/service.type';
import { derived, writable, type Writable } from 'svelte/store';
import { inventory } from './inventory';

const CraftingService = initialCraftingService();

export const craftingItems = writable<ItemWithQuantity[]>([]);
export const requiredItems = derived<
	[Writable<ItemWithQuantity[]>, Writable<ItemWithQuantity[]>],
	ItemWithQuantity[]
>(
	[inventory, craftingItems],
	([$inventory], set) => {
		const existingItems = $inventory.reduce<Record<string, number>>((existingItem, item) => {
			existingItem[item.id] = item.quantity;
			return existingItem;
		}, {});

		set(CraftingService.getRequiredItems(existingItems));
	},
	[]
);

export function addItemIntoCraftingList(itemId: string, quantity = 1) {
	CraftingService.addItem(itemId, quantity);
	craftingItems.update(() => CraftingService.getItems());
}
export function removeItemFromCraftingList(itemId: string, quantity = 1) {
	CraftingService.removeItem(itemId, quantity);
	craftingItems.update(() => CraftingService.getItems());
}
