import { spawn } from 'child_process';

export async function downloadAndConvert(url: string): Promise<Blob> {
	return new Promise((resolve, reject) => {
		console.log('Downloading: ', url);

		const youtubeDl = spawn('yt-dlp', ['-f', 'bestaudio', '-o', '-', url]);
		const ffmpeg = spawn('ffmpeg', ['-i', 'pipe:0', '-vn', '-f', 'mp3', '-']);
		const chunks: BlobPart[] = [];

		youtubeDl.stdout.pipe(ffmpeg.stdin);

		ffmpeg.stdout.on('data', (chunk) => {
			chunks.push(chunk);
		});

		ffmpeg.on('close', () => {
			console.log('Done');
			resolve(new Blob(chunks));
		});

		youtubeDl.on('error', reject);

		ffmpeg.on('error', reject);
	});
}
