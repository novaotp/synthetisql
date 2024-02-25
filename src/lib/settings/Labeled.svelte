<script lang="ts">
    export let label: string;
</script>

<div class="flex justify-between items-center">
    <label for={label}>{label}</label>
    <slot />
</div>
