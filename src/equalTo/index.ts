import { createValidator, ValidationRef, getCurrentPath } from '../core';

export function equalTo<ValidValue = any>(validValue: any | ValidationRef, message?: string) {
	return createValidator<ValidValue>({
		validate: (value, ctx) => {
			const v = typeof validValue === 'function' ? validValue(ctx) : validValue;

			return value === v
				? null
				: {
						path: getCurrentPath(ctx),
						message: message || `Value should equal to ${v}`,
						children: null,
				  };
		},
	});
}
