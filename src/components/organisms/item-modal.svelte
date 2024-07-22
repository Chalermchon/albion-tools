<script lang="ts">
	import Item from 'components/atoms/item.svelte';
	import Modal from 'components/molecules/modal.svelte';
	import type { ItemWithQuantity } from 'lib/albion/types/service.type';
	import { createEventDispatcher } from 'svelte';

	export let isOpen = false;
	export let item: ItemWithQuantity | null = null;
	const dispatch = createEventDispatcher<{
		submit: { itemId: string; quantity: number };
		close: null;
	}>();

	let form: HTMLFormElement;
	function close() {
		isOpen = false;
		item = null;
		dispatch('close');
	}
</script>

{#if isOpen && !!item}
	{@const activeItem = item}
	<Modal on:clickOutside={close} on:close={close}>
		<Item
			readonly
			imageUrl={activeItem.imageUrl}
			name={activeItem.name}
			quantity={activeItem.quantity}
		/>

		<div class="flex flex-col items-center gap-3 min-w-52">
			<h3 class="h3 text-center rounded-xl px-8 text-slate-300">{activeItem.name}</h3>
			<form
				bind:this={form}
				on:submit|preventDefault={(e) => {
					const data = new FormData(e.currentTarget);
					const quantity = data.get('quantity');
					if (quantity) {
						const parsedQuantity = Number(quantity);
						if (!isNaN(parsedQuantity)) {
							dispatch('submit', {
								itemId: activeItem.id,
								quantity: parsedQuantity
							});
						}
					}
				}}
			>
				<div class="relative flex items-center max-w-[10rem]">
					<button
						type="button"
						class="bg-oslo-gray-950 hover:bg-oslo-gray-700 rounded-s-lg p-3 h-11 focus:outline-none"
						on:click={() => {
							dispatch('submit', {
								itemId: activeItem.id,
								quantity: activeItem.quantity - 1
							});
						}}
					>
						<svg
							class="w-3 h-3 text-white"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 18 2"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M1 1h16"
							/>
						</svg>
					</button>
					<input
						class="border-x-0 z-10 h-11 text-center text-sm block w-full py-2.5 bg-oslo-gray-800 border-gray-600 placeholder-gray-400 text-gray-200 focus:ring-blue-500 focus:border-blue-500"
						name="quantity"
						type="number"
						inputmode="numeric"
						autocomplete="off"
						min="0"
						max="9999"
						on:focusout={() => {
							form.requestSubmit();
						}}
						placeholder={`${activeItem.quantity}`}
					/>
					<button
						type="button"
						class="bg-oslo-gray-950 hover:bg-oslo-gray-700 rounded-e-lg p-3 h-11 focus:outline-none"
						on:click={() => {
							dispatch('submit', {
								itemId: activeItem.id,
								quantity: activeItem.quantity + 1
							});
						}}
					>
						<svg
							class="w-3 h-3 text-white"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 18 18"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 1v16M1 9h16"
							/>
						</svg>
					</button>
				</div>
			</form>
		</div>
	</Modal>
{/if}
