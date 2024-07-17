<script lang="ts">
	export let name: string;
	export let imageUrl: string;
	export let quantity: number | undefined = undefined;
</script>

<button class="item bg-neutral-700 shadow-xl shadow-neutral-700/50" on:click>
	<img class="scale-125" alt="{name} Icon" src={imageUrl} />
	<div class="absolute w-7 right-1 bottom-2 text-center font-mono">{quantity ?? ''}</div>
</button>
