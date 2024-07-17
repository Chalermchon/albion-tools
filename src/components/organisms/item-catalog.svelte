<script lang="ts">
	import ItemCatalogService from 'lib/albion/services/item-catalog.service';
	import Item from 'components/atoms/item.svelte';
	import Drawer from 'components/molecules/drawer.svelte';
	import { addItemIntoInventory } from 'store/inventory';

	export let isOpen = false;

	export const categories = ItemCatalogService.getItemsByGroupingWithCategoryAndType();
</script>

<Drawer bind:isOpen>
	<h1 class="h1">Item Catalog</h1>
	{#each categories as category}
		<h3 class="h3 my-4">{category.name}</h3>
		{#each category.types as type}
			<p class="p">- {type.name}</p>
			<div class="flex flex-row flex-wrap mb-2">
				{#each type.items as item}
					<Item
						imageUrl={item.imageUrl}
						name={item.name}
						on:click={() => addItemIntoInventory(item.id)}
					/>
				{/each}
			</div>
		{/each}
	{/each}
</Drawer>
