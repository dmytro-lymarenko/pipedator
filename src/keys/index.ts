import { createValidator, Validator, getCurrentPath } from '../core';

export function keys<ValidValue = any>(validator: Validator, message?: string) {
	return createValidator<ValidValue>({
		validate: (value, ctx) => {
			const error = validator.validate(Object.keys(value), ctx);

			if (error) {
				return {
					path: getCurrentPath(ctx),
					message: message || `Keys should follow the rule: ${error.message}`, // TODO think about better message,
					children: null,
				};
			}

			return null;
		},
	});
}
