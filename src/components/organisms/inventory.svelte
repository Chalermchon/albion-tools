<script lang="ts">
	import AddItemButton from 'components/atoms/add-item-button.svelte';
	import Item from 'components/atoms/item.svelte';
	import type { ItemWithQuantity } from 'lib/albion/types/service.type';
	import { createEventDispatcher } from 'svelte';

	export let items: ItemWithQuantity[] = [];
	const dispatch = createEventDispatcher<{
		clickAddItemButton: null;
		clickItem: { itemId: string };
	}>();
</script>

<h1 class="h1 mb-4">Inventory</h1>
<div class="flex flex-row flex-wrap">
	{#each items as item}
		<Item
			removable
			imageUrl={item.imageUrl}
			name={item.name}
			quantity={item.quantity}
			on:click={() => dispatch('clickItem', { itemId: item.id })}
		/>
	{/each}
	<AddItemButton on:click={() => dispatch('clickAddItemButton')} />
</div>
