<script lang="ts">
	import Icon from './icon.svelte';

	export let name: string;
	export let imageUrl: string;
	export let quantity: number | undefined = undefined;
	export let faded: boolean = false;
	export let removable: boolean = false;

	let isHover = false;
</script>

<button
	class="item bg-neutral-700 shadow-xl shadow-neutral-700/50"
	on:click
	on:mouseenter={() => (isHover = true)}
	on:mouseleave={() => (isHover = false)}
>
	{#if removable}
		<button
			class={`${!isHover && 'invisible'} z-10 bg-red-900/50 text-slate-50 rounded-xl w-8 h-8 absolute-center flex-center-center`}
		>
			<Icon name="minus" class="w-6 h-6" />
		</button>
	{/if}
	<img
		class={`w-24 h-24 scale-125 pointer-events-none ${faded && 'opacity-60'}`}
		alt="{name} Icon"
		src={imageUrl}
	/>
	<div class="absolute w-7 right-1 bottom-2 text-center font-mono">{quantity ?? ''}</div>
</button>
