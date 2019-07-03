import { createValidator, ValidationContext, getCurrentPath } from '../core';
import { alternative } from './index';
import { string } from '../string';
import { number } from '../number';
import { shape } from '../shape';

describe('alternative()', () => {
	it('should invoke all validators when they all fail', () => {
		const mockCallback = (_: any, ctx: ValidationContext) => ({
			path: getCurrentPath(ctx),
			message: 'Test',
			children: null,
		});

		const callbacks = [jest.fn(mockCallback), jest.fn(mockCallback), jest.fn(mockCallback)];
		const [v1, v2, v3] = callbacks.map(callback => createValidator({ validate: callback }));

		expect(alternative(v1, v2, v3).validate(1)).not.toBeNull();

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
		const [v1, v2, v3] = callbacks.map(callback => createValidator({ validate: callback }));

		expect(alternative(v1, v2, v3).validate(1)).toBeNull();

		expect(callbacks[0].mock.calls.length).toBe(1);
		expect(callbacks[1].mock.calls.length).toBe(1);
		expect(callbacks[2].mock.calls.length).toBe(0);
	});

	it('should generate correct message', () => {
		expect(alternative(string(), number()).validate({})).toMatchSnapshot();

		expect(alternative(string(), shape({ foo: number() })).validate({})).toMatchSnapshot();
	});
});
