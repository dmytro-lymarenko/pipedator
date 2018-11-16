import { createValidator } from './core';

export function string() {
	return createValidator({
		validate: (value, ctx) => (typeof value === 'string' ? null : { message: 'Value should be a string', path: ctx.path }),
	});
}

export function empty() {
	return createValidator({
		validate: (value, ctx) => (value.length === 0 ? null : { message: 'Value should be empty', path: ctx.path }),
	});
}
