import type { SongsRecord } from '$lib/db_types';
import { pb } from '$lib/pb.js';
import { BandCrawler } from '$lib/server/BandCrawler';
import { YoutuCrawler } from '$lib/server/YoutuCrawler';
import { json } from '@sveltejs/kit';

const cache = new Map<string, SongsRecord[]>();

export async function GET({ params }) {
	await pb.admins.authWithPassword('admin@admin.com', 'admin');

	if (cache.has(params.query)) {
		console.log('Found cached results for', params.query);
		return json({
			tracks: cache.get(params.query)
		});
	}

	const bandcamp = new BandCrawler();
	const youtube = new YoutuCrawler();
	const bandcampResults = bandcamp.searchTracks(params.query);
	const youtubeResults = youtube.searchTracks(params.query);

	const results = await Promise.all([bandcampResults, youtubeResults]);
	const flattenedResults = results.flat().reverse();

	cache.set(params.query, flattenedResults);
	return json({
		tracks: flattenedResults
	});
}
