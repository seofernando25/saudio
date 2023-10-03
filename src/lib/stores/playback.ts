import type { SongsRecord } from '$lib/db_types';
import { pb } from '$lib/pb';
import { derived, writable } from 'svelte/store';

export const nowPlaying = writable<null | SongsRecord>(null);

export const volume = writable(1);

export const playbackInfo = writable({
	playing: false,
	elapsed: 0,
	duration: 0
});

export const playbackAction = writable<{ e: PlaybackAction }>({ e: 'none' });
export type PlaybackAction = 'play' | 'pause' | 'stop' | 'next' | 'prev' | 'none';

export const playbackSeekRequest = writable(0);

export const songSrc = derived(nowPlaying, ($nowPlaying) => {
	if (!$nowPlaying) return null;
	if (!$nowPlaying.audio) return null;
	return pb.files.getUrl($nowPlaying, $nowPlaying.audio);
});
