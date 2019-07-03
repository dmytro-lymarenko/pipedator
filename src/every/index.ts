import { createValidator, findFirstError, Validator, getCurrentPath } from '../core';
import { pipe } from '../pipe';
import { array } from '../array';

/**
 * value should be an array
 * @param validator
 */
export function every<ValidValue = any>(validator: Validator) {
	return pipe(
		array(),
		createValidator<ValidValue>({
			// here value should be an array
			validate: (value, ctx) => {
				// find the first error among values
				const { error } = findFirstError(
					() => validator,
					i => value[i],
					i => ({
						...ctx,
						path: [...ctx.path, i.toString()],
					}),
					value.length
				);

				if (error) {
					return {
						path: getCurrentPath(ctx),
						message: 'All children should be valid',
						children: [error],
					};
				}

				return null;
			},
		})
	);
}
