import type { SongsRecord } from '$lib/db_types';
import assert from 'assert';
import { JSDOM } from 'jsdom';
const BASE_URL = 'https://bandcamp.com';

export class BandCrawler {
	async searchTracks(track: string, page: number = 1): Promise<SongsRecord[]> {
		const safeTrack = encodeURIComponent(track);
		const safePage = encodeURIComponent(page.toString());
		const url = `${BASE_URL}/search?q=${safeTrack}&item_type=t&page=${safePage}`;
		const response = await fetch(url);
		const text = await response.text();

		const doc = new JSDOM(text);

		// Find result-items
		const results = doc.window.document.querySelectorAll('.result-items .searchresult');
		const tracks: SongsRecord[] = [];
		for (const result of results) {
			const art = result.querySelector('.art img');
			const artSrc = art?.getAttribute('src') ?? '';

			const heading = result.querySelector('.heading');
			const trackName = heading?.textContent?.trim() ?? '';
			const trackUrl = heading?.querySelector('a')?.getAttribute('href') ?? '';

			const subhead = result.querySelector('.subhead');
			const text = subhead?.textContent?.trim() ?? '';
			const parts = text.split(' by ');
			if (parts.length === 1) {
				assert(parts[0].startsWith('by '), 'Expected "by " to be at the start of the string');
				parts[0] = parts[0].substring(3);
				tracks.push({
					artist: parts[0].trim(),
					album: '',
					name: trackName,
					art: artSrc,
					url: trackUrl
				});
			} else {
				tracks.push({
					artist: parts[1].trim(),
					album: parts[0].replace('from ', '').trim(),
					name: trackName,
					art: artSrc,
					url: trackUrl
				});
			}
		}
		return tracks;
	}
}
