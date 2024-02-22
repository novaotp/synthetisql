<script>
	import { IconFile3d, IconSettings } from "@tabler/icons-svelte";
	import Link from "./Link.svelte";
</script>

<nav class="relative w-80 h-full flex flex-col px-10 py-20 gap-3 border-r border-gray-800">
    <Link icon={IconFile3d} label="My Diagrams" href="/" />
    <Link icon={IconSettings} label="Settings" href="/settings" />
</nav>
