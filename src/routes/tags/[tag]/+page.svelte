<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import SongList from '$lib/components/SongList.svelte';
	import { onMount } from 'svelte';
	import type { SongsRecord } from '$lib/db_types';
	export let data: PageData;

	$: songRecords = data.tracks.map((track) => {
		return {
			album: '',
			name: track.name,
			artist: track.artist.name,
			url: track.url,
			art: track.image[track.image.length - 1]['#text']
		} satisfies SongsRecord;
	});
</script>

<div class="flex flex-col h-full gap-4 p-2">
	<!-- Search bar -->
	<form class="justify-center w-full px-8 sticky top-4" method="post" use:enhance>
		<input name="search" type="text" class="w-full input" placeholder="Search" />
	</form>
	<!-- Results -->
	<SongList items={songRecords} />
</div>
