import { createValidator, ValidationRef } from '../core';

export function equalTo(validValue: any | ValidationRef, message?: string) {
	return createValidator({
		validate: (value, ctx) => {
			const v = typeof validValue === 'function' ? validValue(ctx) : validValue;

			return value === v
				? null
				: ctx.generateError({
						value,
						message: message || `Value should equal to ${v}`,
						path: ctx.path,
				  });
		},
	});
}
