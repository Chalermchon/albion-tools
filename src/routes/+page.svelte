<script>
	import AddItemButton from 'components/add-item-button.svelte';
	import Drawer from 'components/drawer.svelte';
	import ItemCatalogSection from 'components/item-catalog-section.svelte';

	export let isOpen = false;
</script>

<AddItemButton
	on:click={() => {
		isOpen = true;
	}}
/>
<Drawer bind:isOpen>
	<ItemCatalogSection />
</Drawer>
