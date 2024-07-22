<script lang="ts">
	import { clickOutside } from 'actions/click-outside';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		close: null;
	}>();
</script>

<div
	use:clickOutside
	on:clickOutside
	class="absolute-center z-50 p-8 border border-gray-500 shadow-2xl shadow-neutral-950 bg-zinc-950/95 flex flex-row justify-center items-center rounded-2xl gap-4"
>
	<slot />

	<button
		on:click={() => dispatch('close')}
		class={`w-6 h-6 flex-center-center fixed-tr m-2 hover:bg-gray-600/50 text-slate-300 rounded-lg `}
	>
		<svg class="w-3 h-3" focusable={1} aria-hidden="true" fill="none" viewBox="0 0 14 14">
			<path
				xmlns="http://www.w3.org/2000/svg"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
			/>
		</svg>
	</button>
</div>
