import {
	ValidationContext,
	createValidator,
	pipe,
	alternative,
	either,
	shape,
	equalTo,
	when,
	greater,
	ref,
	both,
} from './core';

describe('createValidator()', () => {
	it('should create validator', () => {
		const validator = createValidator({
			validate: () => null,
		});

		expect(validator).toBeDefined();
		expect(typeof validator.validate).toBe('function');
	});

	it('should call validate function', () => {
		const validate = jest.fn(() => null);

		const validator = createValidator({
			validate,
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
				validate: (value, ctx) =>
					ctx.generateError({
						value,
						message: 'Test',
						path: ctx.path,
					}),
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

		pipe([createValidator({ validate })]).validate(1);

		expect(validate.mock.calls.length).toBe(1);
		expect(validate.mock.calls[0][0]).toBe(1);
	});

	it('should invoke all validators when they all succeed', () => {
		const callbacks = [jest.fn(() => null), jest.fn(() => null), jest.fn(() => null)];

		expect(pipe(callbacks.map(callback => createValidator({ validate: callback }))).validate(1)).toBeNull();

		callbacks.forEach(callback => {
			expect(callback.mock.calls.length).toBe(1);
		});
	});

	it('should return the first met error in pipe chain of validators', () => {
		const callbacks = [
			jest.fn(() => null),
			jest.fn((value: any, ctx: ValidationContext) =>
				ctx.generateError({
					value,
					message: 'Test',
					path: ctx.path,
				})
			),
			jest.fn(() => null),
		];

		expect(pipe(callbacks.map(callback => createValidator({ validate: callback }))).validate(1)).toMatchSnapshot();

		expect(callbacks[0].mock.calls.length).toBe(1);
		expect(callbacks[1].mock.calls.length).toBe(1);
		expect(callbacks[2].mock.calls.length).toBe(0);
	});

	it('should support custom message', () => {
		const callbacks = [
			jest.fn(() => null),
			jest.fn((value: any, ctx: ValidationContext) =>
				ctx.generateError({
					value,
					message: 'Test',
					path: ctx.path,
				})
			),
		];

		expect(
			pipe(
				callbacks.map(callback => createValidator({ validate: callback })),
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

		alternative([createValidator({ validate })]).validate(1);

		expect(validate.mock.calls.length).toBe(1);
		expect(validate.mock.calls[0][0]).toBe(1);
	});

	it('should invoke all validators when they all fail', () => {
		const mockCallback = (value: any, ctx: ValidationContext) =>
			ctx.generateError({
				value,
				message: 'Test',
				path: ctx.path,
			});

		const callbacks = [jest.fn(mockCallback), jest.fn(mockCallback), jest.fn(mockCallback)];

		expect(alternative(callbacks.map(callback => createValidator({ validate: callback }))).validate(1)).not.toBeNull();

		callbacks.forEach(callback => {
			expect(callback.mock.calls.length).toBe(1);
		});
	});

	it('should succeed when at least one validator succeed', () => {
		const mockCallback = (value: any, ctx: ValidationContext) =>
			ctx.generateError({
				value,
				message: 'Test',
				path: ctx.path,
			});

		const callbacks = [jest.fn(mockCallback), jest.fn(() => null), jest.fn(mockCallback)];

		expect(alternative(callbacks.map(callback => createValidator({ validate: callback }))).validate(1)).toBeNull();

		expect(callbacks[0].mock.calls.length).toBe(1);
		expect(callbacks[1].mock.calls.length).toBe(1);
		expect(callbacks[2].mock.calls.length).toBe(0);
	});

	it('should support custom message', () => {
		const mockCallback = (value: any, ctx: ValidationContext) =>
			ctx.generateError({
				value,
				message: 'Test',
				path: ctx.path,
			});

		const callbacks = [jest.fn(mockCallback), jest.fn(mockCallback)];

		expect(
			alternative(callbacks.map(callback => createValidator({ validate: callback })), 'Custom message').validate(1)
		).toMatchSnapshot();
	});
});

describe('Complex validator', () => {
	it('should validate', () => {
		const required = createValidator({
			validate: (value, ctx) =>
				value === undefined || value === null
					? ctx.generateError({ value, message: 'Value is required', path: ctx.path })
					: null,
		});

		const number = createValidator({
			validate: (value, ctx) =>
				typeof value === 'number'
					? null
					: ctx.generateError({
							value,
							message: 'Value should be a number',
							path: ctx.path,
					  }),
		});

		const validator = both([
			required,
			shape({
				min: either([equalTo(null), number]),
				max: when(['min'], {
					is: number,
					then: both([number, greater(ref(['min']))]),
					otherwise: either([equalTo(null), number]),
				}),
			}),
		]);

		expect(
			validator.validate({
				min: '56',
				max: 6,
			})
		).toMatchSnapshot();
	});
});
