<script lang="ts">
	import AddItemButton from 'components/atoms/add-item-button.svelte';
	import Item from 'components/atoms/item.svelte';
	import type { ItemWithQuantity } from 'lib/albion/types/service.type';
	import { createEventDispatcher } from 'svelte';

	export let title: string;
	export let items: ItemWithQuantity[] = [];
	export let readonly: boolean = false;
	const dispatch = createEventDispatcher<{
		clickAddItemButton: null;
		clickItem: { itemId: string };
	}>();
</script>

<h1 class="h1 mb-4">{title}</h1>
<div class="flex flex-row flex-wrap mb-8">
	{#each items as item}
		<Item
			{readonly}
			imageUrl={item.imageUrl}
			name={item.name}
			quantity={item.quantity}
			on:click={() => {
				if (!readonly) {
					dispatch('clickItem', { itemId: item.id });
				}
			}}
		/>
	{/each}
	{#if !readonly}
		<AddItemButton on:click={() => dispatch('clickAddItemButton')} />
	{/if}
</div>
