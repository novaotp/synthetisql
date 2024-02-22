<script lang="ts">
	import { page } from "$app/stores";
	import type { ComponentType } from "svelte";

    export let icon: ComponentType;
    export let href: string;
    export let label: string;
</script>

<a {href} class="flex gap-5 px-5 py-3 {href === $page.url.pathname ? "bg-gray-800 text-white" : "bg-white text-gray-800 hover:bg-gray-200"} rounded-md">
    <svelte:component this={icon} />
    {label}
</a>
