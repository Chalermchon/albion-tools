import { CraftingService } from 'lib/services';
import type { ItemWithQuantity } from 'lib/albion/types/service.type';
import { derived, writable, type Writable } from 'svelte/store';
import { inventory } from './inventory';

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

export function updateItemIntoCraftingList(itemId: string, quantity: number) {
	CraftingService.upsertItemQuantity(itemId, quantity);
	craftingItems.update(() => CraftingService.getItems());
}
