<script lang="ts">
	import Item from 'components/atoms/item.svelte';
	import Drawer from 'components/molecules/drawer.svelte';
	import type { ItemWithQuantity } from 'lib/albion/types/service.type';
	import { ItemCatalogService } from 'lib/services';
	import { createEventDispatcher } from 'svelte';

	export let isOpen = false;
	export let items: ItemWithQuantity[] = [];
	const dispatch = createEventDispatcher<{
		clickItem: { item: ItemWithQuantity };
	}>();

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
							on:click={() => {
								dispatch('clickItem', {
									item: {
										...item,
										quantity: itemQuantity ?? 0
									}
								});
							}}
							quantity={itemQuantity}
							faded={!itemQuantity}
							editable={false}
						/>
					</div>
				{/each}
			</div>
		{/each}
	{/each}
</Drawer>
