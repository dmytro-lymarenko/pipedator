import * as path from 'path';
import * as fs from 'fs';
import { listValidators } from './utils';

function getValidatorsContent() {
	const validators = listValidators().filter(validator => validator.name !== 'core');

	const tableContext = validators.map(validator => `- [\`${validator.name}\`](#${validator.name})`);

	const validatorsDocs = validators
		.map(validator => {
			const readmeFilePath = path.join(process.cwd(), 'src', validator.name, 'README.md');

			const content = fs.existsSync(readmeFilePath) ? fs.readFileSync(readmeFilePath, 'utf8') : 'Not yet documented';

			return {
				...validator,
				content,
			};
		})
		.map(validator => [`## \`${validator.name}\``, '', validator.content, '', ''].join('\n'));

	return [
		"<!--- This file is generated automatically by `scripts/buildDocs.ts`. Please, don't change it. --->",
		'# Validators',
		'',
		...tableContext,
		'',
		...validatorsDocs,
		'',
	].join('\n');
}

function run() {
	const content = getValidatorsContent();

	fs.writeFileSync(path.join(process.cwd(), 'docs', 'validators.md'), content);
}

// Run the script
run();
