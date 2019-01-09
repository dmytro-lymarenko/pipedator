import { createValidator, getFirstErrors, Validator, getCurrentPath } from '../core';

export function alternative<ValidValue = any>(validators: Validator[], message?: string) {
	return createValidator<ValidValue>({
		validate: (value, ctx) => {
			if (validators.length === 0) {
				return null;
			}
			// find the first success validator
			const errors = getFirstErrors(i => validators[i], () => value, () => ctx, validators.length);

			if (errors.length === validators.length) {
				// here all validators returned an error
				if (errors.length === 1) {
					return errors[0];
				}

				return {
					path: getCurrentPath(ctx),
					message: message || `Either ${errors.map(error => error.message).join(' OR ')}`,
					children: null,
				};
			}

			return null;
		},
	});
}
