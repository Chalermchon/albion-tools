<script lang="ts">
	import { clickOutside } from 'actions/click-outside';

	export let isOpen: boolean = true;

	let drawerElement: HTMLElement | undefined = undefined;

	$: {
		if (isOpen) {
			drawerElement?.scrollTo(0, 0);
		}
	}

	function close() {
		isOpen = false;
	}
</script>

<div
	class={`fixed-tr h-screen w-screen z-20 bg-transparent backdrop-blur-sm drawer-animation ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
/>
<div
	bind:this={drawerElement}
	class={`fixed-tr h-screen w-3/4 z-50 bg-oslo-gray-950 shadow-slate-50 drawer-animation ${isOpen ? 'translate-x-0' : 'translate-x-full'} p-8 scrollable`}
	use:clickOutside
	on:clickOutside={close}
>
	<div class={$$props.class}>
		<slot />
	</div>
</div>
