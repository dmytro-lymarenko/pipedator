import * as path from 'path';
import * as fs from 'fs';

export interface FileMeta {
	name: string;
	path: string;
	fullPath: string;
}

export const ignoredFiles: string[] = ['index.ts'];

export function listValidators(): FileMeta[] {
	const files = fs.readdirSync(path.join(process.cwd(), 'src'));

	return files
		.filter(file => /^[^._]/.test(file) && !ignoredFiles.includes(file))
		.map(file => ({
			name: file,
			path: `./${file}`,
			fullPath: `./src/${file}/index.js`,
		}));
}
