<script lang="ts">
	import type { IndexedTableModel } from '$models/Table';
	import { updateTable } from '$stores/tables';

	export let table: IndexedTableModel;

	let x = table.position.x;
	let y = table.position.y;
	let moving = false;

	function onMouseDown() {
		moving = true;
	}

	function onMouseMove(event: MouseEvent) {
		if (moving) {
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
	on:mousedown={onMouseDown}
	style="left: {x}px; top: {y}px;"
	class="absolute select-none cursor-move"
>
	<div
		class="absolute min-w-[200px] rounded-2xl cursor-pointer bg-white border border-grey-500"
		data-table
	>
		<div
			class="relative w-full px-5 h-10 flex justify-start items-center bg-rose-400 rounded-t-2xl pointer-events-none"
		>
			{table.table.name}
		</div>
		{#each table.table.rows as { row }}
			<div
				class="relative w-full px-5 h-10 flex justify-start items-center pointer-events-none border-b border-rose-400"
			>
				{row.name} : {row.type}{row.precision ? `(${row.precision})` : ''}
			</div>
		{/each}
		<div
			class="relative w-full h-5 flex justify-center items-center rounded-b-2xl pointer-events-none"
		></div>
	</div>
</div>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />
