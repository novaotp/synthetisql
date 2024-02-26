<script lang="ts">
	import { IconPlus } from "@tabler/icons-svelte";
	import Item from "./Item.ContextMenu.svelte";
	import { addTable } from "$stores/table";

	/** The cursor's position when right click occurs. */
	let cursorPosition = { x: 0, y: 0 };
	/** The context menu's dimensions. */
	let menu = { h: 0, w: 0 };
	/** The browser's dimensions. */
	let browser = { h: 0, w: 0 };
	/** If the menu is visible or not. */
	export let showMenu = false;

	function rightClickContextMenu(e: MouseEvent) {
		showMenu = true;
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
</script>

{#if showMenu}
	<nav use:getContextMenuDimension style="position: absolute; top:{cursorPosition.y}px; left:{cursorPosition.x}px">
		<div id="navbar" class="inline-flex flex-col border border-[#999] w-[170px] bg-white rounded-xl overflow-hidden">
			<ul class="m-2 list-none">
				<Item label="Add Item" onClick={addNewTable} icon={IconPlus} />
			</ul>
		</div>
	</nav>
{/if}

<svelte:window on:contextmenu|preventDefault={rightClickContextMenu} on:click={onPageClick} />
