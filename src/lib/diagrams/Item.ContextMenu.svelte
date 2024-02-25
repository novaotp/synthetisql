<script lang="ts">
	import type { ComponentType } from "svelte";

    export let label: string;
    export let icon: ComponentType;
    export let onClick: () => void;
</script>

<li class="block w-[1fr]">
    <button class="text-[1rem] text-[#222] w-full h-8 text-start border-none bg-white" on:click={onClick}>
        <svelte:component this={icon} />
        <span>{label}</span>
    </button>
</li>
