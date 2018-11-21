/**
 * @module validators
 */

import { createValidator } from '../core';

export function empty(message?: string) {
	return createValidator({
		validate: (value, ctx) =>
			value.length === 0
				? null
				: ctx.generateError({
						value,
						message: message || 'Value should be empty',
						path: ctx.path,
				  }),
	});
}
