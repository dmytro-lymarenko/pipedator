import { createValidator } from '../core';

export function test(isValid: (value: any) => boolean, message: string) {
	return createValidator({
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
