import { downloadAndConvert } from '$lib/server/scrapper';
import { redirect } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';

export async function GET(req) {
	console.log('Requesting', req.params.url);
	let error = '';
	let uriResource = '';
	try {
		uriResource = await downloadAndConvert(req.params.url);
	} catch (err) {
		const errorResponse = err as ClientResponseError;
		error = errorResponse.message;
	}

	if (!error) {
		throw redirect(308, uriResource);
	} else {
		return new Response(error, {
			status: 418
		});
	}
}
