import { test } from './index';

describe('test()', () => {
	it('should invoke provided predicate when succeeding', () => {
		const isValid = jest.fn(() => true);

		test(isValid, 'Test').validate(1);

		expect(isValid.mock.calls.length).toBe(1);
		expect(isValid.mock.calls[0][0]).toBe(1);
	});

	it('should invoke provided predicate when failing', () => {
		const isValid = jest.fn(() => false);

		test(isValid, 'Test').validate(1);

		expect(isValid.mock.calls.length).toBe(1);
		expect(isValid.mock.calls[0][0]).toBe(1);
	});

	it('should validate when provided predicate return true', () => {
		expect(test(() => true, 'Test').validate(1)).toBeNull();
	});

	it('should fail when provided predicate return false', () => {
		expect(test(() => false, 'Test').validate(1)).toMatchSnapshot();
	});
});
