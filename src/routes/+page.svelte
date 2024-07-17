<script>
	import { inventory } from 'store/inventory';
	import Inventory from 'components/organisms/inventory.svelte';
	import ItemCatalog from 'components/organisms/item-catalog.svelte';

	let isOpenItemCatalog = false;
</script>

<ItemCatalog bind:isOpen={isOpenItemCatalog} />
<Inventory
	items={$inventory}
	on:clickAddItemButton={() => {
		isOpenItemCatalog = true;
	}}
/>
