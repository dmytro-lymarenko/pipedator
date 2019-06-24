import { prop } from '../prop';
import { Validator, createValidator, getCurrentPath } from '../core';

// export function length<ValidValue = any>(validator: Validator<ValidValue>) {
// 	return prop('length', validator);
// }

function string(...validators: Validator<string>[]): Validator<string> {
	return createValidator({
		validate: (value, ctx) => {
			if (typeof value === 'string') {
				return null;
			}

			return {
				children: null,
				message: 'Value should be a string',
				path: getCurrentPath(ctx),
			};
		},
	});
}

function alphanum(...validators: Validator<string>[]): Validator<string> {
	return createValidator({
		validate: (value, ctx) => {
			if (typeof value === 'string') {
				return null;
			}

			return {
				children: null,
				message: 'Value should be a string',
				path: getCurrentPath(ctx),
			};
		},
	});
}

function shape<S>(validatorMapObject: { [K in keyof S]: Validator<S[K]> }): Validator<S> {
	return createValidator({
		validate: (value, ctx) => {
			return null;
		},
	});
}

function length<L extends { length: number }>(...validator: Validator<number>[]): Validator<L> {
	return createValidator({
		validate: (value, ctx) => {
			return null;
		},
	});
}

function min(value: number, ...validator: Validator<number>[]): Validator<number> {
	return createValidator({
		validate: (value, ctx) => {
			return null;
		},
	});
}

function max(value: number, ...validator: Validator<number>[]): Validator<number> {
	return createValidator({
		validate: (value, ctx) => {
			return null;
		},
	});
}

function optional<T>(...validator: Validator<T>[]): Validator<T | undefined> {
	return createValidator({
		validate: (value, ctx) => {
			return null;
		},
	});
}

function number(...validator: Validator<number>[]): Validator<number> {
	return createValidator({
		validate: (value, ctx) => {
			return null;
		},
	});
}

function and<V>(...validator: Validator<V>[]): Validator<V> {
	return createValidator({
		validate: (value, ctx) => {
			return null;
		},
	});
}

function or<V1>(v1: Validator<V1>): Validator<V1>;
function or<V1, V2>(v1: Validator<V1>, v2: Validator<V2>): Validator<V1 | V2>;
function or<V1, V2, V3>(v1: Validator<V1>, v2: Validator<V2>, v3: Validator<V3>): Validator<V1 | V2 | V3>;
function or<V1, V2, V3, V4>(
	v1: Validator<V1>,
	v2: Validator<V2>,
	v3: Validator<V3>,
	v4: Validator<V4>
): Validator<V1 | V2 | V3 | V4>;
function or<V1, V2, V3, V4, V5>(
	v1: Validator<V1>,
	v2: Validator<V2>,
	v3: Validator<V3>,
	v4: Validator<V4>,
	v5: Validator<V5>
): Validator<V1 | V2 | V3 | V4 | V5>;
function or(...validators: Validator<any>[]) {
	return createValidator({
		validate: (value, ctx) => {
			return null;
		},
	});
}

interface LoginForm {
	login: string;
	password: string | number;
	age?: number;
}

shape<LoginForm>({
	login: string(alphanum(), length(min(3), max(30))),
	password: or(string(), number()),
	age: optional(number(min(18))),
});
