<script lang="ts">
	export let name: keyof typeof icons;
	export let focusable: string | number | null | undefined = undefined;
	let icons = {
		close: {
			box: 14,
			svg: 'm1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
		},
		search: {
			box: 20,
			svg: 'm19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
		},
		minus: {
			box: 24,
			svg: 'M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
		}
	} as const;
	let displayIcon = icons[name];
</script>

<svg
	class={$$props.class}
	{focusable}
	aria-hidden="true"
	fill="none"
	viewBox="0 0 {displayIcon.box} {displayIcon.box}"
>
	<path
		stroke="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="2"
		d={`${displayIcon.svg}`}
	/>
</svg>
