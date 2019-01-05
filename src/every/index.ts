import { createValidator, findFirstRequirement, Validator } from '../core';
import { dependenceRequirementFactory } from '../core/requirements';

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
			const { requirement } = findFirstRequirement(
				() => validator,
				i => value[i],
				i => ({
					...ctx,
					path: [...ctx.path, i.toString()],
				}),
				value.length
			);

			if (requirement) {
				return dependenceRequirementFactory(
					message || `Every value should follow the rule: ${requirement.message}`,
					requirement
				)(ctx.path, value);
			}

			return null;
		},
	});
}
