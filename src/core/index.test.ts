import { createValidator, validate } from './index';

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
