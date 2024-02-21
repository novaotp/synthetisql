<script lang="ts">
	import { goto } from '$app/navigation';
	import { IconPlus } from '@tabler/icons-svelte';
	import { onMount } from 'svelte';
	import { uniqueFilename } from '../utils/uniqueFilename';
	import { createFile } from '../utils/createFile';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(() => {
		document.title = 'Home - SynthetiSQL';
	});

	let filter: string = '';
	let sort: string = '';
	
	$: entries = data.files
						.filter(a => filter === "" || a.filename.toLowerCase().includes(filter.toLowerCase()))
						.sort((a, b) => {
							if (sort === "oldest-to-newest") {
								return a.modifiedAt.getTime() - b.modifiedAt.getTime()
							} else {
								return b.modifiedAt.getTime() - a.modifiedAt.getTime()
							}
						});

	const handleNewDiagram = async (): Promise<void> => {
		console.log("Action");
		const filename = await uniqueFilename('diagram');
		await createFile(filename, '');

		await goto(`/diagrams/${filename}`);
	};
</script>

<div class="relative w-full max-w-[1000px] flex-grow flex flex-col p-8 gap-y-20">
	<header
		class="relative h-20 py-3 flex justify-between items-center bg-white z-40"
	>
		<h1 class="text-3xl font-bold">My Diagrams</h1>
		<button
			class="relative h-full aspect-square rounded-md bg-[#907dff] flex justify-center items-center"
			type="button"
			on:click={handleNewDiagram}
		>
			<IconPlus class="text-white" />
		</button>
	</header>
	<div class="relative w-full h-full px-10">
		<label for="search">
			Search
			<input name="search" type="text" placeholder="Search a diagram..." bind:value={filter} />
		</label>
		<label for="sort">
			Sort
			<select name="sort" bind:value={sort}>
				<option value="">Newest to oldest</option>
				<option value="oldest-to-newest">Oldest to newest</option>
			</select>
		</label>
		<div class="relative w-full grid grid-cols-3 mt-[20px] overflow-y-scroll">
			{#each entries as entry}
				<a href="/diagrams/{entry.filename}">
					{entry.filename}
				</a>
			{:else}
				<p>Looks like you haven't created any diagrams yet</p>
			{/each}
		</div>
	</div>
</div>
