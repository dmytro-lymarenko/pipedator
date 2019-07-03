import { createValidator, findFirstError, Validator } from '../core';

export function pipe<V1, V2>(v1: Validator<V1>, v2: Validator<V2>): Validator<V1 & V2>;
export function pipe<V1, V2, V3>(v1: Validator<V1>, v2: Validator<V2>, v3: Validator<V3>): Validator<V1 & V2 & V3>;
export function pipe<V1, V2, V3, V4>(
	v1: Validator<V1>,
	v2: Validator<V2>,
	v3: Validator<V3>,
	v4: Validator<V4>
): Validator<V1 & V2 & V3 & V4>;
export function pipe<V1, V2, V3, V4, V5>(
	v1: Validator<V1>,
	v2: Validator<V2>,
	v3: Validator<V3>,
	v4: Validator<V4>,
	v5: Validator<V5>
): Validator<V1 & V2 & V3 & V4 & V5>;
export function pipe<V1, V2, V3, V4, V5, V6>(
	v1: Validator<V1>,
	v2: Validator<V2>,
	v3: Validator<V3>,
	v4: Validator<V4>,
	v5: Validator<V5>,
	v6: Validator<V6>
): Validator<V1 & V2 & V3 & V4 & V5 & V6>;
export function pipe<V1, V2, V3, V4, V5, V6, V7>(
	v1: Validator<V1>,
	v2: Validator<V2>,
	v3: Validator<V3>,
	v4: Validator<V4>,
	v5: Validator<V5>,
	v6: Validator<V6>,
	v7: Validator<V7>
): Validator<V1 & V2 & V3 & V4 & V5 & V6 & V7>;
export function pipe<V1, V2, V3, V4, V5, V6, V7, V8>(
	v1: Validator<V1>,
	v2: Validator<V2>,
	v3: Validator<V3>,
	v4: Validator<V4>,
	v5: Validator<V5>,
	v6: Validator<V6>,
	v7: Validator<V7>,
	v8: Validator<V8>
): Validator<V1 & V2 & V3 & V4 & V5 & V6 & V7 & V8>;

export function pipe(...validators: Validator[]) {
	return createValidator({
		validate: (value, ctx) => {
			// find the first error in pipe
			const { error } = findFirstError(i => validators[i], () => value, () => ctx, validators.length);

			return error;
		},
	});
}
