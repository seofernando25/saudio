import { Collections, type DownloadsRecord } from '$lib/db_types';
import { pb } from '$lib/pb';
import { spawn } from 'child_process';
import type { ClientResponseError } from 'pocketbase';

function elipsize(str: string, maxLen: number) {
	if (str.length <= maxLen) return str;
	return str.slice(0, maxLen - 3) + '...';
}

// Download and convert a youtube video to mp3
// It then returns the url to the mp3 file
export async function downloadAndConvert(url: string): Promise<string> {
	// First, check if pb has the file
	const downloadCollection = pb.collection(Collections.Downloads);
	try {
		const pbMaybe = await downloadCollection.getFirstListItem<DownloadsRecord>(`url = '${url}'`, {
			requestKey: null
		});
		const blob = pbMaybe.blob;
		console.log('Found cached audio for', elipsize(url, 30));
		console.log('Blob text', blob);
		url = pb.files.getUrl(pbMaybe, blob ?? '');
		const urlObj = new URL(url);
		url = urlObj.pathname + urlObj.search;

		return url;
	} catch (error) {
		// continue
	}

	console.log('Downloading: ', url);

	const youtubeDl = spawn('yt-dlp', ['-f', 'bestaudio', '-o', '-', url]);
	const ffmpeg = spawn('ffmpeg', ['-i', 'pipe:0', '-vn', '-f', 'mp3', '-']);
	youtubeDl.stdout.pipe(ffmpeg.stdin);

	const collectedChunks: Buffer[] = [];

	let ytDlError = '';

	youtubeDl.stderr.on('data', (chunk) => {
		ytDlError += chunk;
	});

	let ffmpegError = '';

	ffmpeg.stderr.on('data', (chunk) => {
		ffmpegError += chunk;
	});

	return new Promise((resolve, reject) => {
		ffmpeg.stdout.on('data', (chunk: Buffer) => {
			collectedChunks.push(chunk);
		});

		ffmpeg.once('exit', (code, signal) => {
			if (code !== 0) {
				console.log('ffmpeg error', ffmpegError);
				console.log('yt-dl error', ytDlError);
				reject(new Error(`ffmpeg exited with code ${code} and signal ${signal}`));
			} else {
				const chunks = Buffer.concat(collectedChunks);
				const blob = new Blob([chunks], { type: 'audio/mpeg' });

				(async () => {
					console.log('Saving to pb');
					console.log('Size', blob.size);
					try {
						const created = await downloadCollection.create<DownloadsRecord>(
							{
								url: url,
								blob: blob
							},
							{
								requestKey: null
							}
						);
						console.log('Saved to pb');

						url = pb.files.getUrl(created, created.blob ?? '');
						const urlObj = new URL(url);
						url = urlObj.pathname + urlObj.search;
						console.log('Returning url', url);
						resolve(url);
					} catch (error: unknown) {
						const errorResponse = error as ClientResponseError;
						reject(new Error(errorResponse.response.data.blob.message));
					}
				})();
			}
		});
	});
}
