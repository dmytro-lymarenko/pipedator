/**
 * @module validators
 */

import { createValidator, Validator } from '../core';

export function ternary(condition: Validator, success: Validator, failure: Validator) {
	return createValidator({
		validate: (value, ctx) => {
			const error = condition.validate(value, ctx);

			if (error) {
				return failure.validate(value, ctx);
			}

			return success.validate(value, ctx);
		},
	});
}
