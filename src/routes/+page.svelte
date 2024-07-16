<script>
	import AddItemButton from 'components/add-item-button.svelte';
	import Drawer from 'components/drawer.svelte';

	export let isOpen = false;
</script>

<AddItemButton
	on:click={() => {
		isOpen = true;
	}}
/>
<Drawer bind:isOpen>
	<h1 class="h1">Item Catalog</h1>
</Drawer>
