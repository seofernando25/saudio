import type { SongsRecord } from '$lib/db_types';
import { localStorageStore } from '@skeletonlabs/skeleton';
import { derived, writable } from 'svelte/store';

export const nowPlaying = localStorageStore<null | SongsRecord>('nowPlaying', null);

export const volume = localStorageStore('volume', 1);

export const playbackInfo = localStorageStore('playbackInfo', {
	playing: false,
	elapsed: 0,
	duration: 0
});

export const playbackAction = writable<{ e: PlaybackAction }>({ e: 'none' });
export type PlaybackAction = 'play' | 'pause' | 'stop' | 'next' | 'prev' | 'none';

export const playbackSeekRequest = writable(0);

export const songSrc = derived(nowPlaying, ($nowPlaying) => {
	if (!$nowPlaying) return null;
	if (!$nowPlaying.url) return null;
	const src = window.location.origin + '/api/song/' + encodeURIComponent($nowPlaying.url);
	return src;
});

export function togglePlayback() {
	playbackAction.update((action) => {
		if (action.e === 'play') {
			return { e: 'pause' };
		} else {
			return { e: 'play' };
		}
	});
}
