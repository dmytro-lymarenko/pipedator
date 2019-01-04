import { createValidator, findFirstError, isValidationError, Validator, ValidationError } from '../core';

export interface AbstractShapeOptions {
	onlyFirstError?: boolean;
	// wraps each validator provided in a shape
	wrapValidators?: (validator: Validator) => Validator;
}

export function abstractShape<Key, ValidValue = any>(
	keys: Key[],
	shape: (key: Key) => Validator,
	options?: AbstractShapeOptions,
	message?: string
): Validator {
	return createValidator<ValidValue>({
		validate: (value, ctx) => {
			if (value === undefined || value === null) {
				return ctx.generateError({
					value,
					message: 'Value should be defined',
					path: ctx.path,
				});
			}

			let errors: ValidationError[] = [];

			const onlyFirstError = Boolean(options && options.onlyFirstError);
			const wrapValidators = (options && options.wrapValidators) || null;

			function getValidatorAtKey(key: Key): Validator {
				return wrapValidators ? wrapValidators(shape(key)) : shape(key);
			}

			if (onlyFirstError) {
				const { error } = findFirstError(i => getValidatorAtKey(keys[i]), i => value[keys[i]], keys.length, i => ({
					...ctx,
					path: [...ctx.path, keys[i].toString()],
				}));

				if (error) {
					errors = [error];
				}
			} else {
				errors = keys
					.map(key =>
						getValidatorAtKey(key).validate(value[key], {
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
