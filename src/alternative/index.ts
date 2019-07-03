import { createValidator, getFirstErrors, Validator, getCurrentPath } from '../core';

export function alternative<V1, V2>(v1: Validator<V1>, v2: Validator<V2>): Validator<V1 | V2>;
export function alternative<V1, V2, V3>(v1: Validator<V1>, v2: Validator<V2>, v3: Validator<V3>): Validator<V1 | V2 | V3>;
export function alternative<V1, V2, V3, V4>(
	v1: Validator<V1>,
	v2: Validator<V2>,
	v3: Validator<V3>,
	v4: Validator<V4>
): Validator<V1 | V2 | V3 | V4>;
export function alternative<V1, V2, V3, V4, V5>(
	v1: Validator<V1>,
	v2: Validator<V2>,
	v3: Validator<V3>,
	v4: Validator<V4>,
	v5: Validator<V5>
): Validator<V1 | V2 | V3 | V4 | V5>;
export function alternative<V1, V2, V3, V4, V5, V6>(
	v1: Validator<V1>,
	v2: Validator<V2>,
	v3: Validator<V3>,
	v4: Validator<V4>,
	v5: Validator<V5>,
	v6: Validator<V6>
): Validator<V1 | V2 | V3 | V4 | V5 | V6>;
export function alternative<V1, V2, V3, V4, V5, V6, V7>(
	v1: Validator<V1>,
	v2: Validator<V2>,
	v3: Validator<V3>,
	v4: Validator<V4>,
	v5: Validator<V5>,
	v6: Validator<V6>,
	v7: Validator<V7>
): Validator<V1 | V2 | V3 | V4 | V5 | V6 | V7>;
export function alternative<V1, V2, V3, V4, V5, V6, V7, V8>(
	v1: Validator<V1>,
	v2: Validator<V2>,
	v3: Validator<V3>,
	v4: Validator<V4>,
	v5: Validator<V5>,
	v6: Validator<V6>,
	v7: Validator<V7>,
	v8: Validator<V8>
): Validator<V1 | V2 | V3 | V4 | V5 | V6 | V7 | V8>;

export function alternative(...validators: Validator[]) {
	return createValidator({
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
					message: `Either ${errors.map(error => error.message).join(' OR ')}`,
					children: null,
				};
			}

			return null;
		},
	});
}
