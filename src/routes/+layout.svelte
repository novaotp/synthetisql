<script>
	import '../app.css';
	import Navigation from "$lib/Navigation/Navigation.svelte";
	import ToastContainer from "$lib/shared/Toast/Container.svelte";
	import { page } from '$app/stores';
</script>

<div class="relative w-full h-full flex justify-between items-center">
	<ToastContainer />
	{#if !($page.url.pathname.startsWith("/diagrams"))}
		<Navigation />
		<div class="relative h-full flex-grow flex justify-center">
			<main class="relative h-full w-full max-w-[1000px] py-20">
				<slot />
			</main>
		</div>
	{:else}
		<div class="relative h-full w-full">
			<slot />
		</div>
	{/if}
</div>
