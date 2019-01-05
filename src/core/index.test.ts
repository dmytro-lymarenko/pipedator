import { createValidator, validate, groupErrors } from './index';
import { shape } from '../shape';
import { string } from '../string';
import { number } from '../number';
import { alternative } from '../alternative';
import { singleRequirementFactory, dependenceRequirementFactory } from '../core/requirements';

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
					dependenceRequirementFactory('Test', singleRequirementFactory('Inner requirement')(ctx.path, value))(ctx.path, value),
			}).validate(1)
		).toMatchSnapshot();
	});
});

describe('groupErrors()', () => {
	it('should return null when error is null', () => {
		expect(groupErrors(null)).toBeNull();
	});

	it('should work for single error', () => {
		expect(groupErrors(string().validate(1))).toMatchSnapshot();
	});

	it('should work for single-path errors', () => {
		expect(groupErrors(alternative([string(), number()]).validate({}))).toMatchSnapshot();
	});

	it('should work for complex values', () => {
		expect(
			groupErrors(
				shape({
					email: string(),
					number: number(),
				}).validate(5)
			)
		).toMatchSnapshot();

		expect(
			groupErrors(
				shape({
					email: string(),
					address: shape({
						city: string(),
						house: number(),
					}),
				}).validate(5)
			)
		).toMatchSnapshot();

		expect(
			groupErrors(
				shape({
					email: string(),
					address: shape({
						city: string(),
						house: number(),
					}),
				}).validate({ address: {} })
			)
		).toMatchSnapshot();

		expect(
			groupErrors(
				shape({
					email: string(),
					address: alternative([
						shape({
							city: string(),
							house: alternative([string(), number()]),
						}),
						string(),
					]),
				}).validate({ address: {} })
			)
		).toMatchSnapshot();
	});
});
