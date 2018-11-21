/**
 * @module validators
 */

import { createValidator, getFirstErrors, validationErrorToString, Validator } from '../core';

/**
 * value should be an array
 * @param validator
 */
export function some(validator: Validator, message?: string) {
	return createValidator({
		validate: (value, ctx) => {
			if (value.length === 0) {
				return null;
			}
			// find the first success validator
			const errors = getFirstErrors(() => validator, i => value[i], value.length, () => ctx);

			if (errors.length === value.length) {
				// here all values failed
				return ctx.generateError({
					value,
					message:
						message ||
						`At least one value should follow the rule: [${errors.map(error => validationErrorToString(error)).join(' OR ')}]`,
					path: ctx.path,
				});
			}

			return null;
		},
	});
}
