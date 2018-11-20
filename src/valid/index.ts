import { createValidator, ValidationContext } from '../core';

export function valid(validValue: any | ((ctx: ValidationContext) => any)) {
	return createValidator({
		validate: (value, ctx) => {
			const v = typeof validValue === 'function' ? validValue(ctx) : validValue;

			return value === v
				? null
				: ctx.generateError({
						value,
						message: `Value should equal to ${validValue}`,
						path: ctx.path,
				  });
		},
	});
}
