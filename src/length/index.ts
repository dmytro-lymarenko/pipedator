// import { Validator, createValidator, getCurrentPath } from '../core';
// import { alternative } from 'src/alternative';
// import { string } from 'src/string';
// import { optional } from 'src/optional';

// // export function length<ValidValue = any>(validator: Validator<ValidValue>) {
// // 	return prop('length', validator);
// // }

// function alphanum(...validators: Validator<string>[]): Validator<string> {
// 	return createValidator({
// 		validate: (value, ctx) => {
// 			if (typeof value === 'string') {
// 				return null;
// 			}

// 			return {
// 				children: null,
// 				message: 'Value should be a string',
// 				path: getCurrentPath(ctx),
// 			};
// 		},
// 	});
// }

// function shape<S>(validatorMapObject: { [K in keyof S]-?: Validator<S[K]> }): Validator<S> {
// 	return createValidator({
// 		validate: (value, ctx) => {
// 			return null;
// 		},
// 	});
// }

// function prop<V, K extends keyof V>(propName: K, ...validators: Validator<V[K]>[]): Validator<V> {
// 	return createValidator({
// 		validate: (value, ctx) => {
// 			return null;
// 		},
// 	});
// }

// function length<V extends { length: number }>(...validator: Validator<number>[]): Validator<V> {
// 	return prop('length', ...validator);
// }

// function min(value: number, ...validator: Validator<number>[]): Validator<number> {
// 	return createValidator({
// 		validate: (value, ctx) => {
// 			return null;
// 		},
// 	});
// }

// function max(value: number, ...validator: Validator<number>[]): Validator<number> {
// 	return createValidator({
// 		validate: (value, ctx) => {
// 			return null;
// 		},
// 	});
// }

// // function optional<T>(...validator: Validator<T>[]): Validator<T | undefined> {
// // 	return createValidator({
// // 		validate: (value, ctx) => {
// // 			return null;
// // 		},
// // 	});
// // }

// function number(...validator: Validator<number>[]): Validator<number> {
// 	return createValidator({
// 		validate: (value, ctx) => {
// 			return null;
// 		},
// 	});
// }

// function and<V>(...validator: Validator<V>[]): Validator<V> {
// 	return createValidator({
// 		validate: (value, ctx) => {
// 			return null;
// 		},
// 	});
// }

// function array<V>(itemValidator: Validator<V>, ...arrayValidators: Validator<V[]>[]): Validator<V[]> {
// 	return createValidator({
// 		validate: (value, ctx) => {
// 			return null;
// 		},
// 	});
// }

// type Diff<T, U> = T extends U ? never : T; // Remove types from T that are assignable to U
// type NonNullable<T> = Diff<T, null>; // Remove null from T

// function nonNullable<V>(...validators: Validator<NonNullable<V>>[]): Validator<NonNullable<V>>;

// function isEqualTo<V>(value: V): Validator<V>;

// function nullable<T>(...validator: Validator<T>[]): Validator<T | null>;

// interface LoginForm {
// 	login: string;
// 	password: string | number;
// 	age?: number;
// 	meta: {
// 		favoriteMovies?: string[];
// 	};
// }

// shape<LoginForm>({
// 	login: string(alphanum(), length(min(3), max(30))),
// 	password: nonNullable(alternative(string(), number())),
// 	age: optional(number(min(18))),
// 	meta: shape({
// 		favoriteMovies: optional(array(string(), length(min(2)))),
// 	}),
// });
