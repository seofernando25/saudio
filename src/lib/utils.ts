import { createHash } from 'crypto';

export function stringHash(str: string): string {
	const result = createHash('md5').update(str).digest('hex');
	return result;
}
