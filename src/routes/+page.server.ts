import { chart } from '$lib/server/lastfm.js';

export const load = async () => {
	const tags = await chart.topTags();
	return {
		tags: tags
	};
};
