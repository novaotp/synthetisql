<script lang="ts">
	import Toast from './Toast.svelte';

	import { dismissToast, toasts } from '$stores/toast';
</script>

{#if $toasts}
	<section class="absolute bottom-10 right-10 flex flex-col justify-center mt-4 z-[1000]">
		{#each $toasts as toast (toast.id)}
			<Toast
				type={toast.type}
				on:dismiss={() => dismissToast(toast.id)}
            >
                {toast.message}
            </Toast>
		{/each}
	</section>
{/if}
