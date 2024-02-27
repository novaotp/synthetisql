<script lang="ts">
	import { CONFIG_PATH } from '$config/config';
	import Labeled from '$lib/settings/Labeled.svelte';
	import { BaseDirectory, writeTextFile } from '@tauri-apps/api/fs';
	import type { PageData } from './$types';
	import type { Config } from '$models/Config';

	export let data: PageData;

	let autoSave: "true" | "false" = data.config.autoSave;
	let defaultFilenamePrefix: string = data.config.defaultFilenamePrefix;
	let language: string = data.config.language;

	const cancel = () => {
		autoSave = data.config.autoSave;
		defaultFilenamePrefix = data.config.defaultFilenamePrefix;
		language = data.config.language;
	};

	const save = async () => {
		const config: Config = {
			autoSave: autoSave,
			defaultFilenamePrefix: defaultFilenamePrefix,
			language: language
		};

		await writeTextFile(CONFIG_PATH, JSON.stringify(config), { dir: BaseDirectory.Document });

        data.config = config;
	};

	$: unsavedChanges =
		autoSave !== data.config.autoSave ||
		defaultFilenamePrefix !== data.config.defaultFilenamePrefix ||
		language !== data.config.language;
</script>

<h1 class="text-3xl font-bold mb-20">Settings</h1>
<ul class="relative w-full flex-grow flex flex-col gap-5">
	<Labeled label="Auto Save">
		<select
			class="relative p-3 w-80 text-center border border-gray-800 rounded-md"
			name="autoSave"
			bind:value={autoSave}
		>
			<option value="true">Yes</option>
			<option value="false">No</option>
		</select>
	</Labeled>
	<Labeled label="Default Filename Prefix">
		<input
			class="relative p-3 w-80 text-center border border-gray-800 rounded-md"
			name="defaultFilenamePrefix"
			bind:value={defaultFilenamePrefix}
			placeholder="Enter the default filename prefix..."
			required
		/>
	</Labeled>
	<Labeled label="Language">
		<select
			class="relative p-3 w-80 text-center border border-gray-800 rounded-md"
			name="language"
			bind:value={language}
		>
			<option value="English">English</option>
			<option value="French">French</option>
		</select>
	</Labeled>
</ul>
<div class="relative w-full py-5 flex justify-end gap-5">
	<button
		on:click={cancel}
		class="relative text-sm py-2 px-3 flex justify-center items-center rounded-md bg-gray-300 text-black hover:bg-gray-400 disabled:bg-gray-500 disabled:text-gray-800"
		disabled={!unsavedChanges}
	>
		Cancel
	</button>
	<button
		on:click={save}
		class="relative text-sm py-2 px-3 flex justify-center items-center rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-900 disabled:text-slate-400"
		disabled={!unsavedChanges}
	>
		Apply changes
	</button>
</div>
