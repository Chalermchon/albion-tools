<script lang="ts">
	import ItemList from 'components/organisms/item-list.svelte';
	import ItemCatalog from 'components/organisms/item-catalog.svelte';
	import type { ItemWithQuantity } from 'lib/albion/types/service.type';
	import { delay } from 'lib/utils/delay';
	import { addItemIntoInventory, inventory, removeItemFromInventory } from 'store/inventory';
	import {
		addItemIntoCraftingList,
		craftingItems,
		requiredItems,
		removeItemFromCraftingList
	} from 'store/crafting-list';

	let itemsInItemCatalog: ItemWithQuantity[] = [];
	let isOpenItemCatalog = false;
	let handleAddItemFromCatalog: ((itemId: string) => void) | null;
	let handleCloseItemCatalog: (() => void) | null;
	$: {
		if (!isOpenItemCatalog && handleCloseItemCatalog) {
			handleCloseItemCatalog();
			delay(500).then(() => {
				handleCloseItemCatalog = null;
				handleAddItemFromCatalog = null;
				itemsInItemCatalog = [];
			});
		}
	}
</script>

<ItemList
	title="Item to Craft"
	items={$craftingItems}
	on:clickAddItemButton={() => {
		isOpenItemCatalog = true;
		handleAddItemFromCatalog = addItemIntoCraftingList;
		handleCloseItemCatalog = craftingItems.subscribe((items) => {
			itemsInItemCatalog = items;
		});
	}}
	on:clickItem={(e) => removeItemFromCraftingList(e.detail.itemId)}
/>
<ItemList
	title="Inventory"
	items={$inventory}
	on:clickAddItemButton={() => {
		isOpenItemCatalog = true;
		handleAddItemFromCatalog = addItemIntoInventory;
		handleCloseItemCatalog = inventory.subscribe((items) => {
			itemsInItemCatalog = items;
		});
	}}
	on:clickItem={(e) => removeItemFromInventory(e.detail.itemId)}
/>
<ItemList title="Required Items" items={$requiredItems} readonly />
<ItemCatalog
	bind:isOpen={isOpenItemCatalog}
	bind:items={itemsInItemCatalog}
	on:clickItem={(e) => {
		if (handleAddItemFromCatalog) {
			handleAddItemFromCatalog(e.detail.itemId);
		}
	}}
/>
