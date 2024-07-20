<!-- Typescript -->
<script lang="ts">
	import Navbar from 'components/atoms/navbar.svelte';
</script>

<!-- HTML -->
<Navbar>Albion Calculator</Navbar>
<div class="px-9 py-4">
	<slot />
</div>

<!-- CSS -->
<style lang="postcss">
	:global(html) {
		color: theme(colors.zinc.200);
		background-color: theme(colors.zinc.900);
	}
</style>
