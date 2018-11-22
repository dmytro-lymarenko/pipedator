import * as path from 'path';
import * as fs from 'fs';
import { listValidators } from './utils';

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
