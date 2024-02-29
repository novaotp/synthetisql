<script lang="ts">
	import {
		IconCheck as SuccessIcon,
		IconExclamationCircle as ErrorIcon,
		IconInfoCircle as InfoIcon,
		IconX as CloseIcon
	} from '@tabler/icons-svelte';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	export let type: 'success' | 'error' | 'info';

	$: icon = type === 'success' ? SuccessIcon : type === 'error' ? ErrorIcon : InfoIcon;
	$: bgColor =
		type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-300';
</script>

<article
	class="w-auto max-w-[500px] mb-2 flex items-center rounded px-6 py-3 gap-5 text-white {bgColor} shadow-lg"
	role="alert"
	transition:fade
>
	<svelte:component this={icon} class="w-[1.1em]" />
	<div>
		<slot />
	</div>
	<button
		class="border-none bg-transparent text-white"
		on:click={() => dispatch('dismiss')}
	>
		<CloseIcon class="w-[0.8em]" />
	</button>
</article>
