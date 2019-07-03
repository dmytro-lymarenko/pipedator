import { some } from './index';
import { string } from '../string';

describe('some()', () => {
	it('should validate an empty array', () => {
		expect(some(string()).validate([])).toBeNull();
	});

	it('should validate an array when at least one item is a string', () => {
		expect(some(string()).validate(['first', 1, null])).toBeNull();
		expect(some(string()).validate([1, 'middle', null])).toBeNull();
		expect(some(string()).validate([1, null, 'last'])).toBeNull();
	});

	it('should fail when no strings among values', () => {
		expect(some(string()).validate([1, null, {}])).toMatchSnapshot();
	});

	it('should throw an error when a value is not an array', () => {
		expect(some(string()).validate(1)).toMatchSnapshot();
	});
});
