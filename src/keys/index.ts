/**
 * @module validators
 */

import { createValidator, validationErrorToString, Validator } from '../core';

export function keys(validator: Validator, message?: string) {
	return createValidator({
		validate: (value, ctx) => {
			const error = validator.validate(Object.keys(value), ctx);

			if (error) {
				return ctx.generateError({
					value,
					message: message || `Keys should follow the rule: ${validationErrorToString(error)}`,
					path: ctx.path,
				});
			}

			return null;
		},
	});
}
