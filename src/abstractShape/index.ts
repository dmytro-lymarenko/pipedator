import { createValidator, findFirstError, Validator, ValidationError, getCurrentPath } from '../core';

export interface AbstractShapeOptions {
	onlyFirstError?: boolean;
	// wraps each validator provided in a shape
	wrapValidators?: (validator: Validator) => Validator;
	openedBracket?: string;
	closedBracket?: string;
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
				return {
					path: getCurrentPath(ctx),
					message: message || 'Value should be defined',
					children: null,
				};
			}

			let errors: ValidationError[] = [];

			const onlyFirstError = Boolean(options && options.onlyFirstError);
			const wrapValidators = (options && options.wrapValidators) || null;

			function getValidatorAtKey(key: Key): Validator {
				return wrapValidators ? wrapValidators(shape(key)) : shape(key);
			}

			if (onlyFirstError) {
				const { error } = findFirstError(
					i => getValidatorAtKey(keys[i]),
					i => value[keys[i]],
					i => ({
						...ctx,
						path: [...ctx.path, keys[i].toString()],
					}),
					keys.length
				);

				if (error) {
					errors = [error];
				}
			} else {
				function isNotNull(v: ValidationError | null): v is ValidationError {
					return v !== null;
				}

				errors = keys
					.map(key =>
						getValidatorAtKey(key).validate(value[key], {
							...ctx,
							path: [...ctx.path, key.toString()],
						})
					)
					.filter(isNotNull);
			}

			if (errors.length > 0) {
				return {
					path: getCurrentPath(ctx),
					message: message || 'Value should have a valid shape',
					children: errors,
				};
			}

			return null;
		},
	});
}
