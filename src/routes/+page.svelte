<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Header from '$lib/home/Header.svelte';
	import Options from '$lib/home/Options.svelte';
	import Diagrams from '$lib/home/Diagrams.svelte';

	export let data: PageData;

	onMount(() => {
		document.title = 'Home - SynthetiSQL';
	});

	let filter: string = '';
	let sort: string = '';

	$: entries = data.files
		.filter((a) => filter === '' || a.filename.toLowerCase().includes(filter.toLowerCase()))
		.sort((a, b) => {
			if (sort === 'oldest-to-newest') {
				return a.modifiedAt.getTime() - b.modifiedAt.getTime();
			} else {
				return b.modifiedAt.getTime() - a.modifiedAt.getTime();
			}
		});
</script>

<div class="relative w-full max-w-[1000px] flex-grow flex flex-col gap-y-20">
	<Header prefix={data.config.defaultFilenamePrefix} />
	<Options bind:filter bind:sort />
	<Diagrams {entries} />
</div>
