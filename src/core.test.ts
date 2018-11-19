import { createValidator, pipe, alternative, not, every, valuesByKeys } from './core';

describe('createValidator()', () => {
	it('should create validator', () => {
		const validator = createValidator({
			message: 'Test',
			validate: () => null,
		});

		expect(validator).toBeDefined();
		expect(typeof validator.validate).toBe('function');
	});

	it('should call validate function', () => {
		const validate = jest.fn(() => null);

		const validator = createValidator({
			validate,
			message: 'Test',
		});

		const value = 1;

		const result = validator.validate(value);

		expect(result).toBeNull();
		expect(validate.mock.calls.length).toBe(1);
		expect(validate.mock.calls[0][0]).toBe(value);
	});

	it('should return what validate function returns', () => {
		expect(
			createValidator({
				validate: (value, ctx) => ({
					rootValue: ctx.rootValue,
					errors: [
						{
							value,
							message: ctx.message,
							path: ctx.path,
						},
					],
				}),
				message: 'Test',
			}).validate(1)
		).toMatchSnapshot();
	});
});

describe('pipe()', () => {
	it('should always succeed when validators are not passed down', () => {
		expect(pipe([]).validate(1)).toBeNull();
	});

	it('should invoke passed validator', () => {
		const validate = jest.fn(() => null);

		pipe([createValidator({ validate, message: 'Test' })]).validate(1);

		expect(validate.mock.calls.length).toBe(1);
		expect(validate.mock.calls[0][0]).toBe(1);
	});

	it('should invoke all validators when they all succeed', () => {
		const callbacks = [jest.fn(() => null), jest.fn(() => null), jest.fn(() => null)];

		expect(pipe(callbacks.map(callback => createValidator({ validate: callback, message: 'Test' }))).validate(1)).toBeNull();

		callbacks.forEach(callback => {
			expect(callback.mock.calls.length).toBe(1);
		});
	});

	it('should return the first met error in pipe chain of validators', () => {
		const callbacks = [
			jest.fn(() => null),
			jest.fn(() => (value: any, ctx: any) => ({
				rootValue: ctx.value,
				errors: [{ value, message: ctx.message, path: ctx.path }],
			})),
			jest.fn(() => null),
		];

		expect(
			pipe(callbacks.map((callback, i) => createValidator({ validate: callback, message: `Test #${i}` }))).validate(1)
		).toBeDefined();

		expect(callbacks[0].mock.calls.length).toBe(1);
		expect(callbacks[1].mock.calls.length).toBe(1);
		expect(callbacks[2].mock.calls.length).toBe(0);
	});

	it('should support custom message', () => {
		const callbacks = [
			jest.fn(() => null),
			jest.fn((value: any, ctx: any) => ({
				rootValue: ctx.rootValue,
				errors: [{ value, message: ctx.message, path: ctx.path }],
			})),
		];

		expect(
			pipe(
				callbacks.map(callback => createValidator({ validate: callback, message: 'Test' })),
				'Custom message'
			).validate(1)
		).toMatchSnapshot();
	});
});

describe('alternative()', () => {
	it('should always succeed when validators are not passed down', () => {
		expect(alternative([]).validate(1)).toBeNull();
	});

	it('should invoke passed validator', () => {
		const validate = jest.fn(() => null);

		alternative([createValidator({ validate, message: 'Test' })]).validate(1);

		expect(validate.mock.calls.length).toBe(1);
		expect(validate.mock.calls[0][0]).toBe(1);
	});

	it('should invoke all validators when they all fail', () => {
		const mockCallback = (value: any, ctx: any) => ({
			rootValue: value,
			errors: [
				{
					value,
					message: ctx.message,
					path: ctx.path,
				},
			],
		});

		const callbacks = [jest.fn(mockCallback), jest.fn(mockCallback), jest.fn(mockCallback)];

		expect(
			alternative(callbacks.map(callback => createValidator({ validate: callback, message: 'Test' }))).validate(1)
		).not.toBeNull();

		callbacks.forEach(callback => {
			expect(callback.mock.calls.length).toBe(1);
		});
	});

	it('should succeed when at least one validator succeed', () => {
		const mockCallback = (value: any, ctx: any) => ({
			rootValue: value,
			errors: [
				{
					value,
					message: ctx.message,
					path: ctx.path,
				},
			],
		});

		const callbacks = [jest.fn(mockCallback), jest.fn(() => null), jest.fn(mockCallback)];

		expect(
			alternative(callbacks.map(callback => createValidator({ validate: callback, message: 'Test' }))).validate(1)
		).toBeNull();

		expect(callbacks[0].mock.calls.length).toBe(1);
		expect(callbacks[1].mock.calls.length).toBe(1);
		expect(callbacks[2].mock.calls.length).toBe(0);
	});

	it('should support custom message', () => {
		const mockCallback = (value: any, ctx: any) => ({
			rootValue: ctx.rootValue,
			errors: [
				{
					value,
					message: ctx.message,
					path: ctx.path,
				},
			],
		});

		const callbacks = [jest.fn(mockCallback), jest.fn(mockCallback)];

		expect(
			alternative(
				callbacks.map(callback => createValidator({ validate: callback, message: 'Test' })),
				'Custom message'
			).validate(1)
		).toMatchSnapshot();
	});
});

describe('not()', () => {
	it('should opposite validation', () => {
		expect(
			not(
				createValidator({
					message: 'Always fails',
					validate: (value, ctx) => ({ rootValue: value, errors: [{ value, message: ctx.message, path: ctx.path }] }),
				})
			).validate(1)
		).toBeNull();

		expect(
			not(
				createValidator({
					message: 'Always succeed',
					validate: () => null,
				})
			).validate(1)
		).toMatchSnapshot();
	});

	it('should support custom message', () => {
		expect(
			not(
				createValidator({
					message: 'Always succeed',
					validate: () => null,
				}),
				'Always fails'
			).validate(1)
		).toMatchSnapshot();
	});
});

describe('Complex validator', () => {
	it('should validate', () => {
		const required = createValidator({
			message: 'Value is required',
			validate: (value, ctx) =>
				value === undefined || value === null
					? { rootValue: value, errors: [{ value, message: ctx.message, path: ctx.path }] }
					: null,
		});

		const validator = valuesByKeys(['a', 'b'], every(required), 'Each value should be required');

		console.log(
			validator.validate({
				a: 3,
				b: null,
				c: undefined,
			})
		);
	});
});
