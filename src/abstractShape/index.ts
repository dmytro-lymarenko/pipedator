import { createValidator, findFirstError, isValidationError, Validator, ValidationError } from '../core';

export interface AbstractShapeOptions {
	onlyFirstError?: boolean;
}

export function abstractShape<Key, ValidValue = any>(
	keys: Key[],
	shape: (key: Key) => Validator,
	options?: AbstractShapeOptions,
	message?: string
): Validator {
	return createValidator<ValidValue>({
		validate: (value, ctx) => {
			let errors: ValidationError[] = [];

			if (options && options.onlyFirstError) {
				const { error } = findFirstError(i => shape(keys[i]), i => value[keys[i]], keys.length, i => ({
					...ctx,
					path: [...ctx.path, keys[i].toString()],
				}));

				if (error) {
					errors = [error];
				}
			} else {
				errors = keys
					.map(key =>
						shape(key).validate(value[key], {
							...ctx,
							path: [...ctx.path, key.toString()],
						})
					)
					.filter(isValidationError);
			}

			if (errors.length > 0) {
				return ctx.generateError({
					value,
					errors,
					message: message || 'Value should have a valid shape',
					path: ctx.path,
				});
			}

			return null;
		},
	});
}
