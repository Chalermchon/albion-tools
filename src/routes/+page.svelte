<script>
	import AddItemButton from 'components/atoms/add-item-button.svelte';
	import ItemCatalog from 'components/organisms/item-catalog.svelte';

	let isOpenItemCatalog = false;
</script>

<AddItemButton
	on:click={() => {
		isOpenItemCatalog = true;
	}}
/>
<ItemCatalog bind:isOpen={isOpenItemCatalog} />
