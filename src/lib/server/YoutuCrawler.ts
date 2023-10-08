import type { SongsRecord } from '$lib/db_types';
import { pw } from './common';

export class YoutuCrawler {
	async searchTracks(track: string): Promise<SongsRecord[]> {
		const context = await pw.newContext();
		const page = await context.newPage();
		const safeTrack = encodeURIComponent(track + ' hd music');
		await page.goto('https://www.youtube.com/results?search_query=' + safeTrack);

		// Get all "ytd-video-renderer" elements
		const elements = await page.$$('ytd-video-renderer');
		console.log('Found', elements.length, 'videos');
		const videos: SongsRecord[] = [];
		for (const element of elements) {
			await element.scrollIntoViewIfNeeded();
			await page.waitForSelector('yt-image img');

			const thumb = (await (await element.$('yt-image img'))?.getAttribute('src')) ?? '';
			const title = await (await element.$('yt-formatted-string'))?.innerText();
			let url = (await (await element.$('a#video-title'))?.getAttribute('href')) ?? '';
			url = 'https://www.youtube.com' + url;
			const channel =
				(await (await element.$('ytd-channel-name yt-formatted-string'))?.innerText()) ?? '';

			videos.push({
				art: thumb,
				name: title,
				album: '',
				artist: channel,
				url
			});
		}
		await context.close();
		return videos;
	}
}
