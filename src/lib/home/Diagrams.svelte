<script lang="ts">
	import type { FileData } from '$models/FileData';

	export let entries: FileData[];

	const setLocalStorage = (filename: string) => {
		localStorage.setItem("filename", filename);
	}
</script>

<div class="relative w-full flex-grow overflow-y-scroll px-10 grid grid-cols-3 gap-10 p-3">
	{#each entries as entry}
		<a
			on:click={() => setLocalStorage(entry.filename)}
			href="/diagrams"
			class="rounded-xl border border-gray-400 duration-150 cursor-pointer ease-in-out hover:scale-105"
		>
			<iframe
				src="/diagrams"
				title="Iframe title"
				class="relative w-full aspect-square border-b border-gray-400 pointer-events-none"
			></iframe>
			<div class="p-3">
				<h2>{entry.filename}</h2>
				<time class="text-sm text-gray-500"
					>Last save : {entry.modifiedAt.toLocaleDateString('fr-CH')} at {entry.modifiedAt.toLocaleTimeString(
						'fr-CH',
						{ hour: '2-digit', minute: '2-digit' }
					)}</time
				>
			</div>
		</a>
	{:else}
		<p>Looks like you haven't created any diagrams yet</p>
	{/each}
</div>
