import { createValidator, findFirstRequirement, Validator } from '../core';
import { singleRequirementFactory } from '../core/requirements';

export function pipe<ValidValue = any>(validators: Validator[], message?: string) {
	return createValidator<ValidValue>({
		validate: (value, ctx) => {
			// find the first error in pipe
			const { requirement } = findFirstRequirement(i => validators[i], () => value, () => ctx, validators.length);

			if (requirement && message) {
				return singleRequirementFactory(message)(ctx.path, value);
			}

			return requirement;
		},
	});
}
