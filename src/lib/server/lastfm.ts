import { LASTFM_API_KEY } from '$env/static/private';

const LAST_FM_BASE = 'http://ws.audioscrobbler.com/2.0/?format=json&api_key=' + LASTFM_API_KEY;

export type Tag = {
	name: string;
	url: string;
	reach: string;
	taggings: string;
};

export type Artist = {
	name: string;
	playcount: string;
	listeners: string;
	mbid: string;
	url: string;
	streamable: string;
	image: {
		'#text': string;
		size: string;
	}[];
};

export type Track = {
	name: string;
	duration: string;
	playcount: string;
	listeners: string;
	mbid: string;
	url: string;
	artist: {
		name: string;
		mbid: string;
		url: string;
	};
	image: {
		'#text': string;
		size: string;
	}[];
};

export const chart = {
	topTags: async () => {
		const url = `${LAST_FM_BASE}&method=chart.gettoptags`;

		const response = await fetch(url);
		const json = await response.json();
		const tags = json.tags.tag as Tag[];
		return tags;
	},

	topTracks: async () => {
		const url = `${LAST_FM_BASE}&method=chart.gettoptracks`;

		const response = await fetch(url);
		const json = await response.json();
		const tracks = json.tracks.track as Track[];
		return tracks;
	},
	topArtists: async () => {
		const url = `${LAST_FM_BASE}&method=chart.gettopartists`;

		const response = await fetch(url);
		const json = await response.json();
		const artists = json.artists.artist as Artist[];
		return artists;
	}
} as const;

export type TrackSearchResult = {
	name: string;
	artist: string;
	url: string;
	listeners: string;
	image: {
		'#text': string;
		size: string;
	}[];
	mbid: string;
};

export const track = {
	searchTracks: async (track: string) => {
		const safeTrack = encodeURIComponent(track);
		const url = `${LAST_FM_BASE}&method=track.search&track=${safeTrack}`;

		const response = await fetch(url);
		const json = await response.json();
		const tracks = json.results.trackmatches.track as TrackSearchResult[];
		return tracks;
	}
} as const;

export const tag = {
	topTracks: async (tag: string) => {
		const safeTag = encodeURIComponent(tag);
		const url = `${LAST_FM_BASE}&method=tag.gettoptracks&tag=${safeTag}`;

		const response = await fetch(url);
		const json = await response.json();
		const tracks = json.tracks.track as Track[];
		return tracks;
	}
} as const;

import { JSDOM } from 'jsdom';

export const lastFmScrapper = {
	getTrackYoutubeURL: async (trackURL: string) => {
		// "video-preview a"
		// Download the website
		const response = await fetch(trackURL);
		const text = await response.text();
		const doc = new JSDOM(text);
		const videoPreview = doc.window.document.querySelector('.video-preview a');
		const href = videoPreview?.getAttribute('href');
		return href ?? '';
	}
} as const;
