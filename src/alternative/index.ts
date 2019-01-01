import { createValidator, getFirstErrors, Validator } from '../core';

export function alternative<ValidValue = any>(validators: Validator[], message?: string) {
	return createValidator<ValidValue>({
		validate: (value, ctx) => {
			if (validators.length === 0) {
				return null;
			}
			// find the first success validator
			const errors = getFirstErrors(i => validators[i], () => value, validators.length, () => ctx);

			if (errors.length === validators.length) {
				// here all validators returned an error
				return ctx.generateError({
					value,
					errors,
					message: message || `At least one validator should succeed: [${errors.map(error => error.message).join(' OR ')}]`,
					path: ctx.path,
				});
			}

			return null;
		},
	});
}
