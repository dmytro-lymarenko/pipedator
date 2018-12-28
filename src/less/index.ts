import { createValidator, ValidationRef } from '../core';

export function less(limit: number | ValidationRef, message?: string) {
	return createValidator({
		validate: (value, ctx) => {
			const v = typeof limit === 'number' ? limit : limit(ctx);

			return value < v
				? null
				: ctx.generateError({
						value,
						message: message || `Value should be less than ${v}`,
						path: ctx.path,
				  });
		},
	});
}
