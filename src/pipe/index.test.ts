import { createValidator, ValidationContext } from '../core';
import { singleRequirementFactory } from '../core/requirements';
import { pipe } from './index';

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
			jest.fn((value: any, ctx: ValidationContext) => singleRequirementFactory('Test')(ctx.path, value)),
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
			jest.fn((value: any, ctx: ValidationContext) => singleRequirementFactory('Test')(ctx.path, value)),
		];

		expect(
			pipe(
				callbacks.map(callback => createValidator({ validate: callback })),
				'Custom message'
			).validate(1)
		).toMatchSnapshot();
	});
});
