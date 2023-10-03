<script lang="ts">
	import {
		Collections,
		type BaseSystemFields,
		type SongsRecord,
		type SongsResponse
	} from '$lib/db_types';
	import { pb } from '$lib/pb';
	import { nowPlaying } from '$lib/stores/playback';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import type { UnsubscribeFunc } from 'pocketbase';
	import { onMount } from 'svelte';
	import { get, writable, type Writable } from 'svelte/store';

	onMount(async () => {
		$tracks = (await fetch(`api/search/deltarune`).then((res) => res.json())).tracks;
	});

	let audioSrc = '';

	let currentPage = 1;

	type Track = SongsResponse;
	let tracks: Writable<Track[]> = writable([]);

	const songSubs: UnsubscribeFunc[] = [];

	async function doSearch(event: Event) {
		// For every song subscription, unsubscribe
		for (const sub of songSubs) {
			sub();
		}

		const formData = new FormData(event.target as HTMLFormElement);
		event.preventDefault();
		const query = formData.get('search') as string;
		if (!query) return;
		const results = await fetch(`api/search/${query}`).then((res) => res.json());
		console.log(results);

		// Pocketbase realtime subscribe to search results
		for (const result of results.tracks) {
			songSubs.push(
				await pb.collection(Collections.Songs).subscribe(result.id, (data) => {
					console.log('Update:', data);
					let item = $tracks.find((item) => item.id === data.record.id);
					if (!item) return;
					let itemChecked: Track = {
						...item,
						...(data.record as SongsResponse)
					} as Track;
					const index = $tracks.findIndex((item) => item.id === data.record.id);
					if (index === -1) {
						console.error('Index not found');
						return;
					}
					console.log('Updating index', data);
					let next = get(tracks);
					const beforeLen = next.length;
					next = next.filter((_, i) => i !== index);
					console.log('Before:', beforeLen, 'After:', next.length);
					next.push(itemChecked);
					tracks.set(next);
				})
			);
		}

		tracks.set(results.tracks);
	}

	async function getAudioLink(songRec: SongsRecord) {
		nowPlaying.set(songRec);

		if (!songRec.audio) {
			console.error('No audio link found');
			return;
		} else {
			console.log('Audio link found');
		}
		let url = pb.files.getUrl(songRec, songRec.audio);
		audioSrc = url;

		console.log(url);
	}

	tracks.subscribe((val) => console.log(val));
</script>

<div class="flex flex-col h-full gap-4 p-2">
	<!-- Search bar -->
	<form on:submit|preventDefault={doSearch}>
		<input name="search" type="text" class="w-[50%] input" placeholder="Search" />
	</form>
	<!-- Results -->
	<div class="flex flex-wrap gap-4">
		{#each $tracks as result}
			<button
				on:click={() => getAudioLink(result)}
				class="relative card variant-filled-surface card-hover overflow-hidden w-52
                {result.audio ? 'cursor-pointer ' : 'cursor-not-allowed opacity-60'}
                        "
			>
				{#if !result.audio}
					<div class="absolute inset-0 flex items-center justify-center">
						<ProgressRadial
							...
							stroke={100}
							meter="stroke-surface-300"
							track="stroke-surface-300/30"
						/>
					</div>
				{/if}
				<header class="card-header">
					<img
						src={result.art}
						alt="{result.album}'s album art"
						class="self-center bg-black/95 aspect-square w-full max-h-24 object-contain"
					/>
				</header>
				<div class="p-2">
					<span class="font-semibold line-clamp-1" data-toc-ignore="">{result.name}</span>
					<span class="" data-toc-ignore="">by {result.artist}</span>
				</div>
			</button>
		{/each}
	</div>
</div>
