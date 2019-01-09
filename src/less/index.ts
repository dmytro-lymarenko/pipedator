import { createValidator, ValidationRef, getCurrentPath } from '../core';

export function less<ValidValue = any>(limit: number | ValidationRef, message?: string) {
	return createValidator<ValidValue>({
		validate: (value, ctx) => {
			const v = typeof limit === 'number' ? limit : limit(ctx);

			return value < v
				? null
				: {
						path: getCurrentPath(ctx),
						message: message || `Value should be less than ${v}`,
						children: null,
				  };
		},
	});
}
