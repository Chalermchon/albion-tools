<!-- Typescript -->
<script lang="ts">
	import Navbar from 'components/navbar.svelte';
</script>

<!-- HTML -->
<Navbar>Albion Calculator</Navbar>
<slot />

<!-- CSS -->
<style lang="postcss">
	:global(html) {
		color: theme(colors.zinc.200);
		background-color: theme(colors.zinc.900);
	}
</style>
