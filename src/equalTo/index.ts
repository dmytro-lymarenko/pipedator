import { createValidator, ValidationRef, getCurrentPath } from '../core';

export function equalTo<V>(validValue: V | ValidationRef<V>, message?: string) {
	return createValidator<V>({
		validate: (value, ctx) => {
			const v = typeof validValue === 'function' ? (validValue as any)(ctx) : validValue;

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
