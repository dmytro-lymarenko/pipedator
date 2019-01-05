import { createValidator, Validator } from '../core';
import { dependenceRequirementFactory } from '../core/requirements';

export function valuesByKeys<ValidValue = any>(keys: string[], validator: Validator, message?: string) {
	return createValidator<ValidValue>({
		validate: (value, ctx) => {
			if (keys.length === 0) {
				return null;
			}

			const requirement = validator.validate(keys.map(key => value[key]), ctx);

			if (requirement) {
				return dependenceRequirementFactory(message || `Values should follow the rule: ${requirement.message}`, requirement)(
					ctx.path,
					value
				);
			}

			return null;
		},
	});
}
