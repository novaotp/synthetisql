<script lang="ts">
	export let filter: string;
	export let sort: string;
</script>

<div>
	<label for="search">
		Search
		<input name="search" type="text" placeholder="Search a diagram..." bind:value={filter} />
	</label>
	<label for="sort">
		Sort
		<select name="sort" bind:value={sort}>
			<option value="">Newest to oldest</option>
			<option value="oldest-to-newest">Oldest to newest</option>
		</select>
	</label>
</div>
