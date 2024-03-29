<script lang="ts">
	import { goto } from '$app/navigation';
	import { MODEL_PATH } from '$config/config';
	import type { IndexedTableModel } from '$models/Table';
	import { setInitialTables, tables } from '$stores/table';
	import { addToast } from '$stores/toast';
	import { IconChevronLeft } from '@tabler/icons-svelte';
	import { BaseDirectory, exists, renameFile, writeTextFile } from '@tauri-apps/api/fs';

	export let initial: IndexedTableModel[];
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

	const cancel = () => {
		setInitialTables(initial);
		newFilename = name;
	}

	const findErrorOnSave = async (): Promise<string | null> => {
		if (await filenameAlreadyUsed()) {
			return 'Filename already used by another diagram';
		}

		if (newFilename === "") {
			return 'Filename cannot be empty';
		}

		return null;
	}

	const save = async () => {
		const error = await findErrorOnSave();

		if (error) {
			addToast({ type: 'error', message: error });
			return;
		}

		await renameFile(
			`${MODEL_PATH}/${name}.${extension}`,
			`${MODEL_PATH}/${newFilename}.${extension}`,
			{ dir: BaseDirectory.Document }
		);

		initial = $tables;

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
	<div class="relative flex justify-between items-center gap-5">
		<button on:click={cancel} class="px-3 py-2 rounded-md hover:bg-gray-700">Cancel</button>
		<button on:click={save} class="px-3 py-2 rounded-md hover:bg-gray-700">Save</button>
	</div>
</header>
