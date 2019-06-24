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

function or<V>(...validator: Validator<V>[]): Validator<V> {
	return createValidator({
		validate: (value, ctx) => {
			return null;
		},
	});
}

interface LoginForm {
	login: string;
	password: string;
	age?: number;
}

shape<LoginForm>({
	login: string(alphanum(), length(min(3), max(30))),
	password: string(),
	age: optional(number(min(18))),
});
