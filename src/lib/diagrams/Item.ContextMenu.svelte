<script lang="ts">
	import type { ComponentType } from "svelte";

    export let label: string;
    export let icon: ComponentType;
    export let onClick: () => void;
</script>

<li class="relative block w-auto">
    <button class="text-[1rem] text-[#222] w-full h-8 px-2 rounded-md flex gap-5 justify-between items-center text-start border-none bg-white hover:bg-gray-300" on:click={onClick}>
        <svelte:component this={icon} />
        <span>{label}</span>
    </button>
</li>
