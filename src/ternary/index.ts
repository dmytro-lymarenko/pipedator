import { createValidator, Validator } from '../core';

export function ternary<ValidValue = any>(condition: Validator, success: Validator, failure: Validator) {
	return createValidator<ValidValue>({
		validate: (value, ctx) => {
			const error = condition.validate(value, ctx);

			if (error) {
				return failure.validate(value, ctx);
			}

			return success.validate(value, ctx);
		},
	});
}
