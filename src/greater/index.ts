import { createValidator, ValidationRef, getCurrentPath } from '../core';

export function greater<ValidValue = any>(limit: number | ValidationRef, message?: string) {
	return createValidator<ValidValue>({
		validate: (value, ctx) => {
			const v = typeof limit === 'number' ? limit : limit(ctx);

			return value > v
				? null
				: {
						path: getCurrentPath(ctx),
						message: message || `Value should be greater than ${v}`,
						children: null,
				  };
		},
	});
}
