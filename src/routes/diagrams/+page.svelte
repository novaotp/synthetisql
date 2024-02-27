<script lang="ts">
	import ContextMenu from '$lib/diagrams/ContextMenu.svelte';
	import Topbar from '$lib/diagrams/Topbar.svelte';
	import { clearTables, init, tables } from '$stores/table';
	import Table from '$lib/diagrams/Table.svelte';
	import { onMount } from 'svelte';
	import type { IndexedTableModel } from '$models/Table';
	import { BaseDirectory, readTextFile } from '@tauri-apps/api/fs';
	import { filename as storedFilename } from '$stores/filename';
	import { MODEL_PATH } from '$config/config';

	let diagram: IndexedTableModel[] | undefined = undefined;
	let filename: string | undefined = undefined;
	let errorMessage: string | undefined = undefined;

	onMount(async () => {
		clearTables();

		if (!$storedFilename) {
			errorMessage = "Unable to find the selected file";
			return;
		}

		const contents = JSON.parse(await readTextFile(`${MODEL_PATH}/${$storedFilename}`, { dir: BaseDirectory.Document }));
	
		diagram = contents;
		filename = $storedFilename;
		
		init(diagram ?? []);
	})
</script>

{#if errorMessage}
	<p>{errorMessage}</p>
{:else}
	<Topbar
		initial={diagram ?? []}
		filename={filename ?? ''}
	/>
	<div class="relative w-full h-[calc(100%-5rem)]">
		<ContextMenu />
		{#each $tables as table}
			<Table {table} />
		{/each}
	</div>
{/if}
