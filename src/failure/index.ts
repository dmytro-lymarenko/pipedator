/**
 * @module validators
 */

import { createValidator } from '../core';

export function failure(message?: string) {
	return createValidator({
		validate: (value, ctx) =>
			ctx.generateError({
				value,
				message: message || 'Should always fail',
				path: ctx.path,
			}),
	});
}
