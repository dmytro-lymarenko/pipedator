/**
 * @module validators
 */

import { createValidator, ValidationRef } from '../core';

export function equalTo(validValue: any | ValidationRef) {
	return createValidator({
		validate: (value, ctx) => {
			const v = typeof validValue === 'function' ? validValue(ctx) : validValue;

			return value === v
				? null
				: ctx.generateError({
						value,
						message: `Value should equal to ${validValue}`,
						path: ctx.path,
				  });
		},
	});
}
