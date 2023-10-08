<script lang="ts">
	import type { SongsRecord } from '$lib/db_types';
	import { nowPlaying } from '$lib/stores/playback';

	export let items: SongsRecord[] = [];

	async function playSong(song: SongsRecord) {
		if (song.url) {
			return nowPlaying.set(song);
		}
		// api/search/[query]
		const encoded = encodeURIComponent(`${song.name} by ${song.artist}`);
		const url = `/api/search/${encoded}`;
		const res = await fetch(url);
		const data = await res.json();
		const track = data.tracks[0];
		console.log('Playing', track);
		return nowPlaying.set(track);
	}
</script>

<div class="flex flex-wrap gap-4 justify-center">
	{#each items as result}
		<button
			on:click={() => playSong(result)}
			class="card variant-filled-surface card-hover overflow-hidden flex-1 min-w-[18rem]"
		>
			<header class="card-header hidden sm:block">
				<img
					src={result.art}
					alt="{result.album}'s album art"
					class="self-center bg-black/95 w-full max-h-24 object-contain"
				/>
			</header>
			<div class="p-2 flex flex-row sm:flex-col place-content-between">
				<img
					src={result.art}
					alt="{result.album}'s album art"
					class="self-center bg-black/95 aspect-square w-16 object-contain visible sm:hidden"
				/>
				<div class="text-right sm:text-center">
					<span class="font-semibold line-clamp-1" data-toc-ignore="">{result.name}</span>
					<span class="" data-toc-ignore="">by {result.artist}</span>
				</div>
			</div>
		</button>
	{/each}
</div>
