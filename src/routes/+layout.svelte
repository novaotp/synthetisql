<script>
	import '../app.css';
	import Navigation from "$lib/Navigation/Navigation.svelte";
	import { page } from '$app/stores';
</script>

<div class="relative w-full h-full flex justify-between items-center">
	{#if !($page.url.pathname.startsWith("/diagrams/") && !$page.url.pathname.endsWith("/diagrams/"))}
		<Navigation />
	{/if}
	<div class="relative h-full flex-grow flex justify-center">
		<main class="relative h-full w-full max-w-[1000px] py-20">
			<slot />
		</main>
	</div>
</div>
