import { tag } from '$lib/server/lastfm';

export const load = async (req) => {
	const tracks = await tag.topTracks(req.params.tag);

	return {
		tracks: tracks
	};
};
