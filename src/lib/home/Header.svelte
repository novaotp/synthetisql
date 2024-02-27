<script lang="ts">
	import { goto } from "$app/navigation";
	import { IconPlus } from "@tabler/icons-svelte";
	import { createFile } from "../../utils/createFile";
	import { uniqueFilename } from "../../utils/uniqueFilename";

    export let prefix: string;

    const handleNewDiagram = async (): Promise<void> => {
		const filename = await uniqueFilename(prefix);
		await createFile(filename, '[]');

		localStorage.setItem("filename", filename);

		await goto(`/diagrams`);
	};
</script>

<header class="relative h-20 pb-3 flex justify-between items-center bg-white z-40">
    <h1 class="text-3xl font-bold">My Diagrams</h1>
    <button
        class="relative h-full aspect-square rounded-md bg-[#907dff] flex justify-center items-center"
        type="button"
        on:click={handleNewDiagram}
    >
        <IconPlus class="text-white" />
    </button>
</header>
