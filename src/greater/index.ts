import { createValidator, ValidationRef } from '../core';

export function greater<ValidValue = any>(limit: number | ValidationRef, message?: string) {
	return createValidator<ValidValue>({
		validate: (value, ctx) => {
			const v = typeof limit === 'number' ? limit : limit(ctx);

			return value > v
				? null
				: ctx.generateError({
						value,
						message: message || `Value should be greater than ${v}`,
						path: ctx.path,
				  });
		},
	});
}
