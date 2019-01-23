import { createValidator, getFirstErrors, Validator, getCurrentPath } from '../core';
import { pipe } from '../pipe';
import { array } from '../array';

/**
 * value should be an array
 * @param validator
 */
export function some<ValidValue = any>(validator: Validator, message?: string) {
	return pipe<ValidValue>(
		[
			array(),
			createValidator<ValidValue>({
				validate: (value, ctx) => {
					if (value.length === 0) {
						return null;
					}
					// find the first success validator
					const children = getFirstErrors(
						() => validator,
						i => value[i],
						i => ({
							...ctx,
							path: [...ctx.path, i.toString()],
						}),
						value.length
					);

					if (children.length === value.length) {
						// here all values failed

						return {
							children,
							path: getCurrentPath(ctx),
							message: 'At least one child should be valid',
						};
					}

					return null;
				},
			}),
		],
		message
	);
}
