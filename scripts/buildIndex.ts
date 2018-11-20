import * as path from 'path';
import * as fs from 'fs';

interface FileMeta {
	name: string;
	path: string;
	fullPath: string;
}

const ignoredFiles: string[] = ['index.ts'];

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

function getIndexFileContent() {
	const validators = listValidators();

	return [
		"// This file is generated automatically by `scripts/buildIndex.ts`. Please, don't change it.",
		'',
		...validators.map(validator => `export * from '${validator.path}';`),
		'',
	].join('\n');
}

function run() {
	const indexContent = getIndexFileContent();

	fs.writeFileSync(path.join(process.cwd(), 'src', 'index.ts'), indexContent);
}

// Run the script
run();
