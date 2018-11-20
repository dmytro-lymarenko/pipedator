import { createValidator, findFirstError, validationErrorToString, Validator } from '../core';

/**
 * value should be an array
 * @param validator
 */
export function every(validator: Validator, message?: string) {
	return createValidator({
		// here value should be an array
		validate: (value, ctx) => {
			// find the first error among values
			const { error } = findFirstError(() => validator, i => value[i], value.length, () => ctx);

			if (error) {
				return ctx.generateError({
					value,
					message: message || `Every value should follow the rule: ${validationErrorToString(error)}`,
					path: ctx.path,
				});
			}

			return null;
		},
	});
}
