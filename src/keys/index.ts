import { createValidator, Validator } from '../core';
import { dependenceRequirementFactory } from '../core/requirements';

export function keys<ValidValue = any>(validator: Validator, message?: string) {
	return createValidator<ValidValue>({
		validate: (value, ctx) => {
			const requirement = validator.validate(Object.keys(value), ctx);

			if (requirement) {
				return dependenceRequirementFactory(message || `Keys should follow the rule: ${requirement.message}`, requirement)(
					ctx.path,
					value
				);
			}

			return null;
		},
	});
}
