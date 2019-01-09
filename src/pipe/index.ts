import { createValidator, findFirstError, Validator, getCurrentPath } from '../core';

export function pipe<ValidValue = any>(validators: Validator[], message?: string) {
	return createValidator<ValidValue>({
		validate: (value, ctx) => {
			// find the first error in pipe
			const { error } = findFirstError(i => validators[i], () => value, () => ctx, validators.length);

			if (error && message) {
				return {
					message,
					path: getCurrentPath(ctx),
					children: null, // TODO should we really nullify children???
				};
			}

			return error;
		},
	});
}
