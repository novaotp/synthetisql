<script lang="ts">
	import type { PageData } from './$types';
	import ContextMenu from '$lib/diagrams/ContextMenu.svelte';
	import Topbar from '$lib/diagrams/Topbar.svelte';

	export let data: PageData;
</script>

<Topbar filename={data.filename ?? ""} extension={data.extension ?? ""} />
<ContextMenu />
