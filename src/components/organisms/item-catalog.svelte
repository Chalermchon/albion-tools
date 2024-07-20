<script lang="ts">
	import Item from 'components/atoms/item.svelte';
	import Drawer from 'components/molecules/drawer.svelte';
	import { initialItemCatalogService } from 'lib/albion/services/item-catalog.service';
	import type { ItemWithQuantity } from 'lib/albion/types/service.type';
	import { addItemIntoInventory } from 'store/inventory';

	const ItemCatalogService = initialItemCatalogService();

	export let isOpen = false;
	export let items: ItemWithQuantity[] = [];

	const categories = ItemCatalogService.getItemsByGroupingWithCategoryAndType();
</script>

<Drawer bind:isOpen>
	<h1 class="h1">Item Catalog</h1>
	{#each categories as category}
		<h3 class="h3 my-4">{category.name}</h3>
		{#each category.types as type}
			<p class="p">- {type.name}</p>
			<div class="flex flex-row flex-wrap mb-2">
				{#each type.items as item}
					{@const itemQuantity = items.find(({ id }) => id === item.id)?.quantity}
					<div class="hover:-translate-y-2 active:translate-y-1">
						<Item
							imageUrl={item.imageUrl}
							name={item.name}
							on:click={() => addItemIntoInventory(item.id)}
							quantity={itemQuantity}
							disable={!itemQuantity}
						/>
					</div>
				{/each}
			</div>
		{/each}
	{/each}
</Drawer>
