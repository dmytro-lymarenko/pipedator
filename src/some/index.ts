import { createValidator, getFirstErrors, Validator } from '../core';

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
			const errors = getFirstErrors(() => validator, i => value[i], value.length, i => ({
				...ctx,
				path: [...ctx.path, i.toString()],
			}));

			if (errors.length === value.length) {
				// here all values failed
				return ctx.generateError({
					value,
					errors,
					message: message || `At least one value should follow the rule: ${errors[0].message}`,
					path: ctx.path,
				});
			}

			return null;
		},
	});
}
