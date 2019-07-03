import { createValidator, ValidationContext, getCurrentPath } from '../core';
import { pipe } from './index';

describe('pipe()', () => {
	it('should invoke all validators when they all succeed', () => {
		const callbacks = [jest.fn(() => null), jest.fn(() => null), jest.fn(() => null)];
		const [v1, v2, v3] = callbacks.map(callback => createValidator({ validate: callback }));

		expect(
			pipe(
				v1,
				v2,
				v3
			).validate(1)
		).toBeNull();

		callbacks.forEach(callback => {
			expect(callback.mock.calls.length).toBe(1);
		});
	});

	it('should return the first met error in pipe chain of validators', () => {
		const callbacks = [
			jest.fn(() => null),
			jest.fn((_: any, ctx: ValidationContext) => ({
				path: getCurrentPath(ctx),
				message: 'Test',
				children: null,
			})),
			jest.fn(() => null),
		];

		const [v1, v2, v3] = callbacks.map(callback => createValidator({ validate: callback }));

		expect(
			pipe(
				v1,
				v2,
				v3
			).validate(1)
		).toMatchSnapshot();

		expect(callbacks[0].mock.calls.length).toBe(1);
		expect(callbacks[1].mock.calls.length).toBe(1);
		expect(callbacks[2].mock.calls.length).toBe(0);
	});
});
