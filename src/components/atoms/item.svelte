<script lang="ts">
	export let name: string;
	export let imageUrl: string;
	export let quantity: number | undefined = undefined;
	export let faded: boolean = false;
	export let readonly: boolean = false;
	export let editable: boolean = true;

	let isHover = false;
</script>

<button
	class={`item bg-neutral-700 shadow-xl shadow-neutral-700/50 ${readonly && 'pointer-events-none'}`}
	on:click
	on:mouseenter={() => (isHover = true)}
	on:mouseleave={() => (isHover = false)}
>
	{#if editable}
		<button
			class={`${!isHover && 'invisible'} z-10 bg-amber-500/70 text-slate-50 rounded-xl w-12 h-12 absolute-center flex-center-center`}
		>
			<svg
				class="w-8 h-8 text-gray-800 dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="none"
				viewBox="0 0 20 24"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
				/>
			</svg>
		</button>
	{/if}

	<img
		class={`w-24 h-24 scale-125 pointer-events-none ${(faded || (editable && isHover)) && 'opacity-60'}`}
		alt="{name} Icon"
		src={imageUrl}
	/>
	<div class="absolute w-7 right-1 bottom-2 text-center font-mono">{quantity ?? ''}</div>
</button>
