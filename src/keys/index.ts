import { createValidator, Validator } from '../core';

export function keys<ValidValue = any>(validator: Validator, message?: string) {
	return createValidator<ValidValue>({
		validate: (value, ctx) => {
			const error = validator.validate(Object.keys(value), ctx);

			if (error) {
				return ctx.generateError({
					value,
					message: message || `Keys should follow the rule: ${error.message}`,
					path: ctx.path,
					errors: [error],
				});
			}

			return null;
		},
	});
}
