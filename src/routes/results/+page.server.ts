import { redirect, type Actions } from '@sveltejs/kit';
import { chart, track, type TrackSearchResult } from '$lib/server/lastfm.js';

export const load = async (req) => {
	const search = req.url.searchParams.get('search');
	let tracks: TrackSearchResult[] = [];
	if (!search) {
		tracks = (await chart.topTracks()).map((track) => ({
			artist: track.artist.name,
			image: track.image,
			listeners: track.listeners,
			mbid: track.mbid,
			name: track.name,
			url: track.url
		}));
	} else {
		tracks = await track.searchTracks(search);
	}

	return {
		results: {
			tracks
		}
	};
};

export const actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const search = data.get('search')?.toString() ?? '';
		throw redirect(303, `/results/?search=${encodeURIComponent(search)}`);
	}
} satisfies Actions;
