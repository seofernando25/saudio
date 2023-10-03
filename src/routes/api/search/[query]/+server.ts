import { Collections, type SongsResponse } from '$lib/db_types.js';
import { pb } from '$lib/pb.js';
import { BandCrawler } from '$lib/server/BandCrawler';
import { stringHash } from '$lib/utils';
import { json } from '@sveltejs/kit';
import { downloadAndConvert } from '$lib/server/scrapper';

export async function GET({ params }) {
	const scrapper = new BandCrawler();
	const results = await scrapper.searchTracks(params.query);

	const downloadJobs = [];

	for (const track of results.tracks) {
		// Check if track exists in DB
		let songRes: SongsResponse;
		try {
			const escapedTrackName = track.track.replace(/"/g, '\\"');
			songRes = await pb
				.collection(Collections.Songs)
				.getFirstListItem(`name = "${escapedTrackName}"`);
		} catch (e) {
			console.log('Song not found in DB, creating new entry', track.track);
			const requestKey = track.track + track.artist;
			const requestKeyHash = stringHash(requestKey);
			songRes = await pb.collection(Collections.Songs).create<SongsResponse>(
				{
					name: track.track,
					artist: track.artist,
					album: track.album,
					art: track.art,
					isDownloading: true
				},
				{
					requestKey: requestKeyHash.toString()
				}
			);

			downloadJobs.push(
				downloadAndConvert(track.url).then(async (audio) => {
					console.log('Downloaded audio for', track.track);
					console.log('Size:', audio.size);

					if (audio.size === 0) {
						console.log('Audio size is 0, skipping');
						await pb.collection(Collections.Songs).update<SongsResponse>(songRes.id, {
							isDownloading: false
						});
						return;
					}

					await pb.collection(Collections.Songs).update<SongsResponse>(songRes.id, {
						audio: audio,
						isDownloading: false
					});
				})
			);
		}
	}

	// SongsRecord[]
	const safeQuery = params.query.replace(/"/g, '\\"');
	const records = await pb.collection(Collections.Songs).getFullList({
		filter: `name ~ "${safeQuery}" || album ~ "${safeQuery}" || artist ~ "${safeQuery}"`
	});

	console.log('Returning results');
	return json({
		tracks: records,
		lastPageNumber: results.lastPageNumber
	});
}
