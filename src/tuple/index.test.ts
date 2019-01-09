import { tuple } from './index';
import { number } from '../number';
import { string } from '../string';
import { ignore } from '../ignore';
import { nullable } from '../nullable';

describe('tuple()', () => {
	it('should validate', () => {
		expect(tuple([number(), string()]).validate([1, 'text'])).toBeNull();
		expect(tuple([number(), string()]).validate([1, 'text', {}])).toBeNull();
		expect(tuple([ignore(), number()]).validate([null /* or any other value */, 5])).toBeNull();
	});

	it('should fail', () => {
		expect(tuple([number(), string()]).validate(['1', 'text'])).toMatchSnapshot();
		expect(tuple([number(), string()]).validate([1])).toMatchSnapshot();
	});

	it('should fail and return all errors', () => {
		expect(tuple([number(), string()]).validate(['1'])).toMatchSnapshot();
	});

	it('should fail and return only the first error', () => {
		expect(tuple([number(), string()], { onlyFirstError: true }).validate(['1'])).toMatchSnapshot();
	});

	it('should support custom message', () => {
		expect(tuple([number(), string()], undefined, 'Custom message').validate([1])).toMatchSnapshot();
	});

	it('should support wrapping validators', () => {
		expect(tuple([number(), string()], { wrapValidators: validator => nullable(validator) }).validate([null, null])).toBeNull();
	});
});
