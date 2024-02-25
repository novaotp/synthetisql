<script lang="ts">
	import type { PageData } from './$types';
	import ContextMenu from '$lib/diagrams/ContextMenu.svelte';
	import Topbar from '$lib/diagrams/Topbar.svelte';
	import { clearTables, initialTables, tables } from '$stores/tables';
	import Table from '$lib/diagrams/Table.svelte';
	import { onMount } from 'svelte';

	export let data: PageData;

	onMount(() => {
		clearTables();
		initialTables(data.diagram ?? []);
	})
</script>

<Topbar filename={data.filename ?? ""} extension={data.extension ?? ""} />
<div class="relative w-full h-[calc(100%-5rem)]">
	<ContextMenu />
	{#each $tables as table}
		<Table {table} />
	{/each}
</div>
