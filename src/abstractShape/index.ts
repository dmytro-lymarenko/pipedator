import { createValidator, findFirstError, isValidationError, Validator } from '../core';

export function abstractShape<Key>(
	keys: Key[],
	shape: (key: Key) => Validator,
	options?: { onlyFirstError?: boolean },
	message?: string
) {
	return createValidator({
		validate: (value, ctx) => {
			if (options && options.onlyFirstError) {
				const { error } = findFirstError(i => shape(keys[i]), i => value[keys[i]], keys.length, i => ({
					...ctx,
					path: [...ctx.path, keys[i].toString()],
				}));

				if (error && message) {
					return ctx.generateError({
						value,
						message,
						path: ctx.path,
					});
				}

				return error;
			}

			const errors = keys
				.map(key =>
					shape(key).validate(value[key], {
						...ctx,
						path: [...ctx.path, key.toString()],
					})
				)
				.filter(isValidationError)
				.reduce((res, err) => [...res, ...err.errors], []);

			if (errors.length > 0) {
				if (message) {
					return ctx.generateError({
						value,
						message,
						path: ctx.path,
					});
				}

				return ctx.generateErrors(errors);
			}

			return null;
		},
	});
}
