<script lang="ts">
	import type { IndexedTableModel } from '$models/Table';
	import { selectedTableId, setSelectedTableId, tables, updateTable } from '$stores/table';

	export let table: IndexedTableModel;

	$: x = table.position.x;
	$: y = table.position.y;

	let moving = false;

	function onMouseDown() {
		moving = true;
		setSelectedTableId(table.id);
	}

	function onMouseMove(event: MouseEvent) {
		if (moving && $selectedTableId === table.id) {
			x += event.movementX;
			y += event.movementY;
		}
	}

	function onMouseUp() {
		moving = false;
		updateTable(table.id, table.table, { x, y });
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	data-table={true}
	data-table-id={table.id}
	on:mousedown={onMouseDown}
	on:mouseup={onMouseUp} 
	on:mousemove={onMouseMove}
	style="left: {x}px; top: {y}px;"
	class={`absolute ${moving ? 'cursor-move' : 'cursor-pointer'} min-w-[200px] rounded-2xl bg-white ${$selectedTableId === table.id ? 'border-[3px] border-blue-500' : 'border border-grey-700'}`}
>
	<div
		class="relative w-full px-5 h-10 flex justify-center items-center bg-rose-400 rounded-t-xl pointer-events-none"
	>
		<h2>{table.table.name}</h2>
	</div>
	<div
		class="relative w-full px-5 h-10 flex justify-start items-center pointer-events-none border-b border-rose-400"
	>
		ID: {table.id}
	</div>
	<div
		class="relative w-full px-5 h-10 flex justify-start items-center pointer-events-none border-b border-rose-400"
	>
		X: {x}px | Y: {y}px
	</div>
	{#each table.table.rows as { row }}
		<div
			class="relative w-full px-5 h-10 flex justify-start items-center pointer-events-none border-b border-rose-400"
		>
			{row.name} : {row.type}{row.precision ? `(${row.precision})` : ''}
		</div>
	{/each}
	<div
		class="relative w-full h-5 flex justify-center items-center rounded-b-xl pointer-events-none"
	></div>
</div>
