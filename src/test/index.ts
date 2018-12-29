import { createValidator } from '../core';

export function test<ValidValue = any>(isValid: (value: any) => boolean, message: string) {
	return createValidator<ValidValue>({
		validate: (value, ctx) =>
			isValid(value)
				? null
				: ctx.generateError({
						value,
						message,
						path: ctx.path,
				  }),
	});
}
