import { createValidator, Validator, getCurrentPath } from '../core';

export function valuesByKeys<ValidValue = any>(keys: string[], validator: Validator, message?: string) {
	return createValidator<ValidValue>({
		validate: (value, ctx) => {
			if (keys.length === 0) {
				return null;
			}

			const error = validator.validate(keys.map(key => value[key]), ctx);

			if (error) {
				return {
					path: getCurrentPath(ctx),
					message: message || (error.children ? 'Values should be valid' : `Values should follow the rule: ${error.message}`),
					children: error.children && error.children.map(child => ({ ...child, path: keys[parseInt(child.path, 10)] })),
				};
			}

			return null;
		},
	});
}
