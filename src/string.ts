import { createValidator } from './core';

export function string() {
	return createValidator({
		message: 'Value should be a string',
		validate: (value, ctx) =>
			typeof value === 'string'
				? null
				: {
						rootValue: value,
						errors: [
							{
								value,
								message: ctx.message,
								path: ctx.path,
							},
						],
				  },
	});
}

export function empty() {
	return createValidator({
		message: 'Value should be empty',
		validate: (value, ctx) =>
			value.length === 0
				? null
				: {
						rootValue: value,
						errors: [
							{
								value,
								message: ctx.message,
								path: ctx.path,
							},
						],
				  },
	});
}
