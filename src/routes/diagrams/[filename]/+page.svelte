<script lang="ts">
	import type { PageData } from './$types';
	import ContextMenu from '$lib/diagrams/ContextMenu.svelte';
	import Topbar from '$lib/diagrams/Topbar.svelte';
	import { init, tables } from '$stores/table';
	import Table from '$lib/diagrams/Table.svelte';
	import { onMount } from 'svelte';

	export let data: PageData;

	onMount(() => {
		init(data.diagram ?? []);
	})
</script>

<Topbar initial={data.diagram ?? []} filename={data.filename ?? ""} extension={data.extension ?? ""} />
<div class="relative w-full h-[calc(100%-5rem)]">
	<ContextMenu />
	{#each $tables as table}
		<Table {table} />
	{/each}
</div>
