import { createValidator, findFirstError, Validator } from '../core';

export function pipe<ValidValue = any>(validators: Validator[], message?: string) {
	return createValidator<ValidValue>({
		validate: (value, ctx) => {
			// find the first error in pipe
			const { error } = findFirstError(i => validators[i], () => value, validators.length, () => ctx);

			if (error && message) {
				return ctx.generateError({
					value,
					message,
					path: ctx.path,
				});
			}

			return error;
		},
	});
}
