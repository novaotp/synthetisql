<script lang="ts">
	import { goto } from '$app/navigation';
	import { MODEL_PATH } from '$config/config';
	import type { IndexedTableModel } from '$models/Table';
	import { tables } from '$stores/table';
	import { addToast } from '$stores/toast';
	import { IconChevronLeft } from '@tabler/icons-svelte';
	import { BaseDirectory, renameFile, writeTextFile } from '@tauri-apps/api/fs';

	export let initial: IndexedTableModel[];
	export let filename: string;
	export let extension: string;

	let newFilename: string = filename;

	const back = async () => {
		await goto("/")
	}

	const save = async () => {
		await renameFile(
			`${MODEL_PATH}/${filename}.${extension}`,
			`${MODEL_PATH}/${newFilename}.${extension}`,
			{ dir: BaseDirectory.Document }
		);

		await writeTextFile(`${MODEL_PATH}/${newFilename}.${extension}`, JSON.stringify($tables), {
			dir: BaseDirectory.Document
		});

		addToast({ type: 'success', message: 'File saved successfully' });
	};
</script>

<header class="relative w-full h-20 py-5 px-10 flex justify-between bg-gray-800 text-white">
	<button on:click={back} class="flex gap-3 py-2 border-b-2 border-gray-800 text-white">
		<IconChevronLeft />
		<span>My Diagrams</span>
	</button>
	<div class="flex items-center">
		<input
			bind:value={newFilename}
			name="filename"
			placeholder="Diagram file name"
			class="w-auto bg-transparent"
		/>
		<span>.{extension}</span>
	</div>
	<button on:click={save}>Save</button>
</header>
