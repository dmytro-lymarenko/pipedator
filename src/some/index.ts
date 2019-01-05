import { createValidator, getFirstRequirements, Validator } from '../core';
import { alternativeRequirementFactory } from '../core/requirements';

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
			const requirements = getFirstRequirements(
				() => validator,
				i => value[i],
				i => ({
					...ctx,
					path: [...ctx.path, i.toString()],
				}),
				value.length
			);

			if (requirements.length === value.length) {
				// here all values failed
				const requirement = requirements[0];

				return alternativeRequirementFactory(
					message || `At least one item should follow the rule: ${requirement.message}`,
					requirements
				)(ctx.path, value);
			}

			return null;
		},
	});
}
