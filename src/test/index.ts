import { createValidator, getCurrentPath } from '../core';

export function test<V>(isValid: (value: any) => value is V, message: string) {
	return createValidator<V>({
		validate: (value, ctx) => (isValid(value) ? null : { message, path: getCurrentPath(ctx), children: null }),
	});
}
