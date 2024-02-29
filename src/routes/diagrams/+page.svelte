<script lang="ts">
	import ContextMenu from '$lib/diagrams/ContextMenu.svelte';
	import Topbar from '$lib/diagrams/Topbar.svelte';
	import { clearTables, init, setSelectedTableId, tables } from '$stores/table';
	import Table from '$lib/diagrams/Table.svelte';
	import { onMount } from 'svelte';
	import type { IndexedTableModel } from '$models/Table';
	import { BaseDirectory, readTextFile } from '@tauri-apps/api/fs';
	import { MODEL_PATH } from '$config/config';

	let diagram: IndexedTableModel[] | undefined = undefined;
	let filename: string | undefined = undefined;
	let isLoading: boolean = true;
	let errorMessage: string | undefined = undefined;

	onMount(async () => {
		clearTables();

		const storedFilename: string | null = localStorage.getItem('filename');

		if (!storedFilename) {
			errorMessage = 'Unable to find the selected file';
			return;
		}

		try {
			const contents = JSON.parse(
				await readTextFile(`${MODEL_PATH}/${storedFilename}`, { dir: BaseDirectory.Document })
			);

			diagram = contents;
			filename = storedFilename;

			init(diagram ?? []);
		} catch (error) {
			console.error(error);
			errorMessage = (error as Error).message;
		} finally {
			isLoading = false;
		}
	});

	const onMouseDown = (event: MouseEvent) => {
		if (!(event.target as HTMLElement).dataset.table) {
			setSelectedTableId(undefined);
		}
	};
</script>

{#if errorMessage}
	<p>{errorMessage}</p>
{:else if isLoading}
	<p>Loading diagram...</p>
{:else}
	<Topbar initial={diagram ?? []} filename={filename ?? ''} />
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<main class="relative w-full h-[calc(100%-5rem)]" on:click|preventDefault={onMouseDown}>
		<ContextMenu />
		{#each $tables as table}
			<Table {table} />
		{/each}
	</main>
{/if}
