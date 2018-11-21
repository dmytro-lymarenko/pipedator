/**
 * @module validators
 */

import { createValidator } from '../core';

export function string() {
	return createValidator<string>({
		validate: (value, ctx) =>
			typeof value === 'string'
				? null
				: ctx.generateError({
						value,
						message: 'Value should be a string',
						path: ctx.path,
				  }),
	});
}
