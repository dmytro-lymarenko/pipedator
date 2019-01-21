import { createValidator, validate, getCurrentPath, ref } from './index';

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

describe('ref()', () => {
	it('should return the root value when path is an empty array', () => {
		expect(ref([])({ path: [], rootValue: 1, value: 1 })).toBe(1);
		expect(ref([])({ path: [], rootValue: undefined, value: undefined })).toBe(undefined);
		expect(ref([])({ path: [], rootValue: null, value: null })).toBe(null);
		expect(ref([])({ path: [], rootValue: 0, value: 0 })).toBe(0);
		expect(ref([])({ path: [], rootValue: false, value: false })).toBe(false);
	});

	it('should return the value by specified path', () => {
		expect(ref(['a'])({ path: [], rootValue: { a: 2 }, value: 1 })).toBe(2);
		expect(ref(['a', 'b'])({ path: [], rootValue: { a: { b: 3 } }, value: 1 })).toBe(3);
		expect(ref(['1', 'b'])({ path: [], rootValue: [{}, { b: 3 }], value: 1 })).toBe(3);
		expect(ref(['1', '0'])({ path: [], rootValue: [{}, [5, 6]], value: 1 })).toBe(5);
		expect(ref(['1', '0', 'a'])({ path: [], rootValue: [{}, [{ a: 7 }, 6]], value: 1 })).toBe(7);
	});

	it('should return undefined when there is no specified path in the value', () => {
		expect(ref(['b'])({ path: [], rootValue: { a: 2 }, value: 1 })).toBeUndefined();
		expect(ref(['b'])({ path: [], rootValue: 0, value: 1 })).toBeUndefined();
		expect(ref(['b'])({ path: [], rootValue: false, value: 1 })).toBeUndefined();
		expect(ref(['b'])({ path: [], rootValue: '', value: 1 })).toBeUndefined();
		expect(ref(['a', 'c'])({ path: [], rootValue: { a: { b: 3 } }, value: 1 })).toBeUndefined();
		expect(ref(['2', 'b'])({ path: [], rootValue: [{}, { b: 3 }], value: 1 })).toBeUndefined();
	});

	it('should return undefined when value is undefined or null', () => {
		expect(ref(['a'])({ path: [], rootValue: undefined, value: 1 })).toBeUndefined();
		expect(ref(['a'])({ path: [], rootValue: null, value: 1 })).toBeUndefined();
		expect(ref(['a', 'b', 'c'])({ path: [], rootValue: null, value: 1 })).toBeUndefined();
	});
});
