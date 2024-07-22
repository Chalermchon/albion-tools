<script lang="ts">
	import ItemList from 'components/organisms/item-list.svelte';
	import ItemCatalog from 'components/organisms/item-catalog.svelte';
	import type { ItemWithQuantity } from 'lib/albion/types/service.type';
	import { delay } from 'lib/utils/delay';
	import { inventory, updateItemIntoInventory } from 'store/inventory';
	import { craftingItems, requiredItems, updateItemIntoCraftingList } from 'store/crafting-list';
	import ItemModal from 'components/organisms/item-modal.svelte';

	let itemsInItemCatalog: ItemWithQuantity[] = [];
	let isOpenItemCatalog = false;
	let handleClickItemFromCatalog: (item: ItemWithQuantity) => void;
	let handleCloseItemCatalog: (() => void) | null;
	$: {
		if (!isOpenItemCatalog && handleCloseItemCatalog) {
			handleCloseItemCatalog();
			delay(200).then(() => {
				handleCloseItemCatalog = null;
				itemsInItemCatalog = [];
			});
		}
	}

	let isOpenItemModal = false;
	let itemInItemModal: ItemWithQuantity | null = null;
	let handleSubmitFromItemModal: (itemId: string, quantity: number) => void;
	let handleCloseItemModal: () => void;
</script>

<ItemModal
	bind:isOpen={isOpenItemModal}
	bind:item={itemInItemModal}
	on:submit={(e) => {
		const { itemId, quantity } = e.detail;
		handleSubmitFromItemModal(itemId, quantity);
	}}
	on:close={handleCloseItemModal}
/>
<ItemList
	title="Item to Craft"
	items={$craftingItems}
	on:clickAddItemButton={() => {
		const unsubscribeCraftingItemsForItemCatalog = craftingItems.subscribe((items) => {
			itemsInItemCatalog = items;
		});
		handleClickItemFromCatalog = (clickedItem) => {
			const item = $craftingItems.find((item) => item.id === clickedItem.id);
			itemInItemModal = item ?? clickedItem;
			isOpenItemModal = true;
		};
		handleCloseItemCatalog = unsubscribeCraftingItemsForItemCatalog;

		const unsubscribeCraftingItemsForItemModal = craftingItems.subscribe((items) => {
			if (itemInItemModal) {
				const { id } = itemInItemModal;
				const item = items.find((item) => item.id === id);
				if (item) {
					itemInItemModal = item;
				} else {
					itemInItemModal.quantity = 0;
				}
			}
		});
		handleSubmitFromItemModal = (itemId, quantity) => {
			updateItemIntoCraftingList(itemId, quantity);
		};
		handleCloseItemModal = unsubscribeCraftingItemsForItemModal;

		isOpenItemCatalog = true;
	}}
	on:clickItem={(e) => {
		const { itemId: clickedItemId } = e.detail;
		const unsubscribeCraftingItemsForItemModal = craftingItems.subscribe((items) => {
			const item = items.find((item) => item.id === clickedItemId);
			if (item) {
				itemInItemModal = item;
			} else if (itemInItemModal) {
				itemInItemModal.quantity = 0;
			}
		});
		handleSubmitFromItemModal = (itemId, quantity) => {
			updateItemIntoCraftingList(itemId, quantity);
		};
		handleCloseItemModal = unsubscribeCraftingItemsForItemModal;

		isOpenItemModal = true;
	}}
/>
<ItemList
	title="Inventory"
	items={$inventory}
	on:clickAddItemButton={() => {
		const unsubscribeInventoryForItemCatalog = inventory.subscribe((items) => {
			itemsInItemCatalog = items;
		});
		handleClickItemFromCatalog = (clickedItem) => {
			const item = $inventory.find((item) => item.id === clickedItem.id);
			itemInItemModal = item ?? clickedItem;
			isOpenItemModal = true;
		};
		handleCloseItemCatalog = unsubscribeInventoryForItemCatalog;

		const unsubscribeInventoryForItemModal = inventory.subscribe((items) => {
			if (itemInItemModal) {
				const { id } = itemInItemModal;
				const item = items.find((item) => item.id === id);
				if (item) {
					itemInItemModal = item;
				} else {
					itemInItemModal.quantity = 0;
				}
			}
		});
		handleSubmitFromItemModal = (itemId, quantity) => {
			updateItemIntoInventory(itemId, quantity);
		};
		handleCloseItemModal = unsubscribeInventoryForItemModal;

		isOpenItemCatalog = true;
	}}
	on:clickItem={(e) => {
		const { itemId: clickedItemId } = e.detail;
		const unsubscribeInventoryForItemModal = inventory.subscribe((items) => {
			const item = items.find((item) => item.id === clickedItemId);
			if (item) {
				itemInItemModal = item;
			} else if (itemInItemModal) {
				itemInItemModal.quantity = 0;
			}
		});
		handleSubmitFromItemModal = (itemId, quantity) => {
			updateItemIntoInventory(itemId, quantity);
		};
		handleCloseItemModal = unsubscribeInventoryForItemModal;

		isOpenItemModal = true;
	}}
/>
<ItemList title="Required Items" items={$requiredItems} readonly />
<ItemCatalog
	bind:isOpen={isOpenItemCatalog}
	bind:items={itemsInItemCatalog}
	on:clickItem={(e) => {
		const { item } = e.detail;
		handleClickItemFromCatalog(item);
		isOpenItemCatalog = false;
	}}
/>
