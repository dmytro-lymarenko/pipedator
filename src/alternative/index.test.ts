import { createValidator, ValidationContext, getCurrentPath } from '../core';
import { alternative } from './index';
import { string } from '../string';
import { number } from '../number';
import { shape } from '../shape';

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
		const mockCallback = (_: any, ctx: ValidationContext) => ({
			path: getCurrentPath(ctx),
			message: 'Test',
			children: null,
		});

		const callbacks = [jest.fn(mockCallback), jest.fn(mockCallback), jest.fn(mockCallback)];

		expect(alternative(callbacks.map(callback => createValidator({ validate: callback }))).validate(1)).not.toBeNull();

		callbacks.forEach(callback => {
			expect(callback.mock.calls.length).toBe(1);
		});
	});

	it('should succeed when at least one validator succeed', () => {
		const mockCallback = (_: any, ctx: ValidationContext) => ({
			path: getCurrentPath(ctx),
			message: 'Test',
			children: null,
		});

		const callbacks = [jest.fn(mockCallback), jest.fn(() => null), jest.fn(mockCallback)];

		expect(alternative(callbacks.map(callback => createValidator({ validate: callback }))).validate(1)).toBeNull();

		expect(callbacks[0].mock.calls.length).toBe(1);
		expect(callbacks[1].mock.calls.length).toBe(1);
		expect(callbacks[2].mock.calls.length).toBe(0);
	});

	it('should support custom message', () => {
		const mockCallback = (_: any, ctx: ValidationContext) => ({
			path: getCurrentPath(ctx),
			message: 'Test',
			children: null,
		});

		const callbacks = [jest.fn(mockCallback), jest.fn(mockCallback)];

		expect(
			alternative(callbacks.map(callback => createValidator({ validate: callback })), 'Custom message').validate(1)
		).toMatchSnapshot();
	});

	it('should generate correct message', () => {
		expect(alternative([string()]).validate({})).toMatchSnapshot();

		expect(alternative([string(), number()]).validate({})).toMatchSnapshot();

		expect(alternative([string(), shape({ foo: number() })]).validate({})).toMatchSnapshot();
	});
});
