<!-- Typescript -->
<script lang="ts">
	import Navbar from 'components/navbar.svelte';
	import PageContent from 'components/page-content.svelte';
</script>

<!-- HTML -->
<Navbar>Albion Calculator</Navbar>
<PageContent>
	<slot />
</PageContent>

<!-- CSS -->
<style lang="postcss">
	:global(html) {
		color: theme(colors.zinc.200);
		background-color: theme(colors.zinc.900);
	}
</style>
