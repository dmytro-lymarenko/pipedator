import { createValidator, ValidationRef, getCurrentPath } from '../core';

export function oneOf<ValidValue = any>(allowedValues: (any | ValidationRef)[], message?: string) {
	return createValidator<ValidValue>({
		validate: (value, ctx) => {
			const values = allowedValues.map(v => (typeof v === 'function' ? v(ctx) : v));

			return values.includes(value)
				? null
				: {
						path: getCurrentPath(ctx),
						message: message || `Value should be one of ${JSON.stringify(values)}`,
						children: null,
				  };
		},
	});
}
