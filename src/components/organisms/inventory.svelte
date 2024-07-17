<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { ItemsInInventory } from 'lib/albion/types/service.type';
	import AddItemButton from 'components/atoms/add-item-button.svelte';
	import Item from 'components/atoms/item.svelte';

	export let items: ItemsInInventory = [];

	const dispatch = createEventDispatcher();

	const handleClickAddButton = () => {
		dispatch('clickAddItemButton');
	};
</script>

<h1 class="h1 mb-4">Inventory</h1>
<div class="flex flex-row flex-wrap">
	{#each items as item}
		<Item imageUrl={item.imageUrl} name={item.name} quantity={item.quantity} />
	{/each}
	<AddItemButton on:click={handleClickAddButton} />
</div>
