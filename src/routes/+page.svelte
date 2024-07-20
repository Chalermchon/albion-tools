<script lang="ts">
	import Inventory from 'components/organisms/inventory.svelte';
	import ItemCatalog from 'components/organisms/item-catalog.svelte';
	import type { ItemWithQuantity } from 'lib/albion/types/service.type';
	import { delay } from 'lib/utils/delay';
	import { inventory } from 'store/inventory';

	let itemsInItemCatalog: ItemWithQuantity[] = [];
	let isOpenItemCatalog = false;
	let handleCloseItemCatalog: (() => void) | null;
	$: {
		if (!isOpenItemCatalog && handleCloseItemCatalog) {
			handleCloseItemCatalog();
			delay(500).then(() => {
				handleCloseItemCatalog = null;
				itemsInItemCatalog = [];
			});
		}
	}
</script>

<Inventory
	items={$inventory}
	on:clickAddItemButton={() => {
		isOpenItemCatalog = true;
		handleCloseItemCatalog = inventory.subscribe((items) => {
			itemsInItemCatalog = items;
		});
	}}
/>
<ItemCatalog bind:isOpen={isOpenItemCatalog} bind:items={itemsInItemCatalog} />
