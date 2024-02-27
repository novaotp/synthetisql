<script lang="ts">
	import { goto } from '$app/navigation';
	import { MODEL_PATH } from '$config/config';
	import type { IndexedTableModel } from '$models/Table';
	import { tables } from '$stores/table';
	import { addToast } from '$stores/toast';
	import { IconChevronLeft } from '@tabler/icons-svelte';
	import { BaseDirectory, exists, renameFile, writeTextFile } from '@tauri-apps/api/fs';

	export const initial: IndexedTableModel[] = [];
	export let filename: string;

	let alreadyUsed: boolean = false;

	$: name = filename.split('.').at(0)!;
	$: extension = filename.split('.').at(1)!;

	$: newFilename = name;

	const back = async () => {
		await goto('/');
	};

	const runFilenameChangeCheck = async () => {
		alreadyUsed = await filenameAlreadyUsed();
	}

	const filenameAlreadyUsed = async (): Promise<boolean> =>
		filename !== `${newFilename}.${extension}` &&
		(await exists(`${MODEL_PATH}/${newFilename}.${extension}`, {
			dir: BaseDirectory.Document
		}));

	const save = async () => {
		if (await filenameAlreadyUsed()) {
			addToast({ type: 'error', message: 'Filename already used by another diagram' });
			return;
		}

		if (newFilename === "") {
			addToast({ type: 'error', message: 'Filename cannot be empty' });
            return;
		}

		await renameFile(
			`${MODEL_PATH}/${name}.${extension}`,
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
	<div class="relative flex items-center">
		<div class="relative flex justify-center">
			<input
				bind:value={newFilename}
				name="filename"
				placeholder="Diagram file name"
				class="w-auto bg-transparent"
				on:input={runFilenameChangeCheck}
			/>
			{#if alreadyUsed}
				<p class="absolute text-center -bottom-[calc(100%+1rem)] mx-auto px-1 rounded-lg bg-red-600 text-white text-sm">
					Filename already used
				</p>
			{/if}
		</div>
		<span>.{extension}</span>
	</div>
	<button on:click={save}>Save</button>
</header>
