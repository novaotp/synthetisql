<script lang="ts">
	import type { PageData } from "./$types";

    export let data: PageData;

    let autoSave: boolean = data.config.autoSave;
    let defaultFilenamePrefix: string = data.config.defaultFilenamePrefix;
</script>

<div>
    <label for="autoSave">Auto Save</label>
    <select name="autoSave" bind:value={autoSave}>
        <option value={true}>Yes</option>
        <option value={false}>No</option>
    </select>
</div>
<div>
    <label for="defaultFilenamePrefix">Default Filename Prefix</label>
    <input name="defaultFilenamePrefix" bind:value={defaultFilenamePrefix} placeholder="Enter the default filename prefix..." required />
</div>
