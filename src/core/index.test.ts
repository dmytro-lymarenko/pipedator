import { createValidator, validate, getCurrentPath } from './index';

describe('createValidator()', () => {
	it('should create validator', () => {
		const validator = createValidator({
			validate: () => null,
		});

		expect(validator).toBeDefined();
		expect(typeof validator.validate).toBe('function');
	});

	it('should call validate function', () => {
		const validateCb = jest.fn(() => null);

		const validator = createValidator({
			validate: validateCb,
		});

		const value = 1;

		const result = validate(validator, value);

		expect(result).toBeNull();
		expect(validateCb.mock.calls.length).toBe(1);
		expect(validateCb.mock.calls[0][0]).toBe(value);
	});

	it('should return what validate function returns', () => {
		expect(
			createValidator({
				validate: (_, ctx) => ({
					path: getCurrentPath(ctx),
					message: 'Test',
					children: [
						{
							path: 'inner',
							message: 'Inner error',
							children: null,
						},
					],
				}),
			}).validate(1)
		).toMatchSnapshot();
	});
});

describe('getCurrentPath()', () => {
	it('should return empty string when path is empty array', () => {
		expect(getCurrentPath({ path: [], rootValue: 1, value: 1 })).toBe('');
	});

	it('should return the last item from path array from context', () => {
		expect(getCurrentPath({ path: ['a'], rootValue: 1, value: 1 })).toBe('a');
		expect(getCurrentPath({ path: ['a', 'b'], rootValue: 1, value: 1 })).toBe('b');
		expect(getCurrentPath({ path: ['a', 'b', 'c'], rootValue: 1, value: 1 })).toBe('c');
	});
});
