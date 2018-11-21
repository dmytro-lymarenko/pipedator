/**
 * @module validators
 */

import { createValidator, ValidationRef } from '../core';

export function greater(min: number | ValidationRef) {
	return createValidator({
		validate: (value, ctx) => {
			const v = typeof min === 'number' ? min : min(ctx);

			return value > v
				? null
				: ctx.generateError({
						value,
						message: `Value should be greater than ${v}`,
						path: ctx.path,
				  });
		},
	});
}
