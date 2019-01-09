import { createValidator, getCurrentPath } from '../core';

export function test<ValidValue = any>(isValid: (value: any) => boolean, message: string) {
	return createValidator<ValidValue>({
		validate: (value, ctx) => (isValid(value) ? null : { message, path: getCurrentPath(ctx), children: null }),
	});
}
