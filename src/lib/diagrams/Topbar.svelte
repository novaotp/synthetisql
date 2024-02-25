<script lang="ts">
	import { MODEL_PATH } from '$config/config';
	import { tables } from '$stores/tables';
	import { addToast } from '$stores/toast';
	import { IconChevronLeft } from '@tabler/icons-svelte';
	import { BaseDirectory, renameFile, writeTextFile } from '@tauri-apps/api/fs';

	export let filename: string;
	export let extension: string;

	let newFilename: string = filename;

	const save = async () => {
		await renameFile(
			`${MODEL_PATH}/${filename}.${extension}`,
			`${MODEL_PATH}/${newFilename}.${extension}`,
			{ dir: BaseDirectory.Document }
		);

		await writeTextFile(`${MODEL_PATH}/${newFilename}.${extension}`, JSON.stringify($tables), { dir: BaseDirectory.Document })

		addToast({ type: "success", message: "File saved successfully" })
	};
</script>

<header class="relative w-full h-20 py-5 px-10 flex justify-between">
	<a href="/" class="flex gap-3 py-2 border-b-2 border-gray-800"><IconChevronLeft /> My Diagrams</a>
	<div class="flex items-center">
		<input bind:value={newFilename} name="filename" placeholder="Diagram file name" class="w-auto" />
		<span>.{extension}</span>
	</div>
	<button on:click={save}>Save</button>
</header>
