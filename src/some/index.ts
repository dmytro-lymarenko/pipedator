import { createValidator, getFirstErrors, validationErrorToString, Validator } from '../core';

/**
 * value should be an array
 * @param validator
 */
export function some<ValidValue = any>(validator: Validator, message?: string) {
	return createValidator<ValidValue>({
		validate: (value, ctx) => {
			if (!Array.isArray(value)) {
				throw new Error('Value should be an array');
			}

			if (value.length === 0) {
				return null;
			}
			// find the first success validator
			const errors = getFirstErrors(() => validator, i => value[i], value.length, () => ctx);

			if (errors.length === value.length) {
				// here all values failed
				return ctx.generateError({
					value,
					message: message || `At least one value should follow the rule: ${validationErrorToString(errors[0])}`,
					path: ctx.path,
				});
			}

			return null;
		},
	});
}
