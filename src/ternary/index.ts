import { createValidator, Validator } from '../core';

export function ternary<ValidValue = any>(condition: Validator, success: Validator, failure: Validator) {
	return createValidator<ValidValue>({
		validate: (value, ctx) => {
			const requirement = condition.validate(value, ctx);

			if (requirement) {
				return failure.validate(value, ctx);
			}

			return success.validate(value, ctx);
		},
	});
}
