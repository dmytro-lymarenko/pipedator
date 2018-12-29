import { createValidator, ValidationRef } from '../core';

export function equalTo<ValidValue = any>(validValue: any | ValidationRef, message?: string) {
	return createValidator<ValidValue>({
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
