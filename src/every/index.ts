import { createValidator, findFirstError, Validator } from '../core';

/**
 * value should be an array
 * @param validator
 */
export function every<ValidValue = any>(validator: Validator, message?: string) {
	return createValidator<ValidValue>({
		// here value should be an array
		validate: (value, ctx) => {
			if (!Array.isArray(value)) {
				throw new Error('Value should be an array');
			}

			// find the first error among values
			const { error } = findFirstError(() => validator, i => value[i], value.length, i => ({
				...ctx,
				path: [...ctx.path, i.toString()],
			}));

			if (error) {
				return ctx.generateError({
					value,
					message: message || `Every value should follow the rule: ${error.message}`,
					path: ctx.path,
					errors: [error],
				});
			}

			return null;
		},
	});
}
