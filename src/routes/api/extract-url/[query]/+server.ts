import { json } from '@sveltejs/kit';

const cache = new Map();

export async function GET({ params }) {
	const q = params.query;
	if (cache.has(q)) {
		return json(cache.get(q));
	}

	// Extract the audio URL from the page using yt-dlp subprocess
	const { spawn } = await import('child_process');
	const child = spawn('yt-dlp', ['-g', q]);
	let done = false;
	let audioUrl = '';
	let err = '';
	child.stdout.on('data', (data) => {
		audioUrl += data;
	});
	child.stderr.on('data', (data) => {
		err += data;
	});

	child.on('close', (code) => {
		if (code !== 0) {
			console.error(`yt-dlp process exited with code ${code}`);
			console.error(`stderr: ${err}`);
		}
		done = true;
	});
	return new Promise((resolve) => {
		const interval = setInterval(() => {
			if (done) {
				if (err) {
					return resolve(json({ error: err }));
				}
				// filter empty lines
				const urls = audioUrl.split('\n').filter((url) => url);
				clearInterval(interval);
				cache.set(q, urls);
				resolve(json(urls));
			}
		}, 100);
	});
}
