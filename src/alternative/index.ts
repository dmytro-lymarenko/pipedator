import { createValidator, getFirstRequirements, Validator } from '../core';
import { alternativeRequirementFactory } from '../core/requirements';

export function alternative<ValidValue = any>(validators: Validator[], message?: string) {
	return createValidator<ValidValue>({
		validate: (value, ctx) => {
			if (validators.length === 0) {
				return null;
			}
			// find the first success validator
			const requirements = getFirstRequirements(i => validators[i], () => value, () => ctx, validators.length);

			if (requirements.length === validators.length) {
				// here all validators returned an error
				if (requirements.length === 1) {
					return requirements[0];
				}

				return alternativeRequirementFactory(
					message || `Either ${requirements.map(requirement => requirement.message).join(' OR ')}`,
					requirements
				)(ctx.path, value);
			}

			return null;
		},
	});
}
