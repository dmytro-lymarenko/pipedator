import { createValidator, validationErrorToString, Validator } from '../core';

export function valuesByKeys<ValidValue = any>(keys: string[], validator: Validator, message?: string) {
	return createValidator<ValidValue>({
		validate: (value, ctx) => {
			if (keys.length === 0) {
				return null;
			}

			const error = validator.validate(keys.map(key => value[key]), ctx);

			if (error) {
				return ctx.generateError({
					value,
					message: message || `Values should follow the rule: ${validationErrorToString(error)}`,
					path: ctx.path,
				});
			}

			return null;
		},
	});
}
