<script lang="ts">
	import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-svelte";
	import Item from "./Item.ContextMenu.svelte";
	import { addTable, deleteTable, selectedTableId, setSelectedTableId } from "$stores/table";
	import { message } from "@tauri-apps/api/dialog";

	/** The cursor's position when right click occurs. */
	let cursorPosition = { x: 0, y: 0 };
	/** The context menu's dimensions. */
	let menu = { h: 0, w: 0 };
	/** The browser's dimensions. */
	let browser = { h: 0, w: 0 };
	/** If the menu is visible or not. */
	export let showMenu = false;

	let tableMenu: boolean = false;

	function rightClickContextMenu(e: MouseEvent) {
		showMenu = true;

		if ((e.target as HTMLElement).dataset.table) {
			setSelectedTableId((e.target as HTMLElement).dataset.tableId);
			tableMenu = true;
		} else {
			tableMenu = false;
        }

		browser = {
			w: window.innerWidth,
			h: window.innerHeight
		};
		cursorPosition = {
			x: e.clientX,
			y: e.clientY - 80
		};
		
		if (browser.h - cursorPosition.y < menu.h) cursorPosition.y = cursorPosition.y - menu.h;
		if (browser.w - cursorPosition.x < menu.w) cursorPosition.x = cursorPosition.x - menu.w;
	}

	function onPageClick(e: MouseEvent) {
		showMenu = false;
	}

	function getContextMenuDimension(node: any) {
		let height = node.offsetHeight;
		let width = node.offsetWidth;

		menu = {
			h: height,
			w: width
		};
	}

	const addNewTable = () => {
		addTable({ x: cursorPosition.x, y: cursorPosition.y })
	}

	const deleteExistingTable = () => {
		deleteTable($selectedTableId!)
	}
</script>

{#if showMenu}
	<ul use:getContextMenuDimension style="top:{cursorPosition.y}px; left:{cursorPosition.x}px" class="z-50 p-2 gap-2 list-none absolute inline-flex flex-col border border-[#999] w-auto bg-white rounded-xl overflow-hidden">
		{#if tableMenu}
			<Item label="Edit properties" onClick={async () => await message("Not implemented yet")} icon={IconEdit} />
			<Item label="Delete table" onClick={deleteExistingTable} icon={IconTrash} />
		{:else}
			<Item label="Add Table" onClick={addNewTable} icon={IconPlus} />
		{/if}
	</ul>
{/if}

<svelte:window on:contextmenu|preventDefault={rightClickContextMenu} on:click={onPageClick} />
