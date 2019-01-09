import { every } from './index';
import { string } from '../string';

describe('every()', () => {
	it('should validate an empty array', () => {
		expect(every(string()).validate([])).toBeNull();
	});

	it('should validate an array when all items are string', () => {
		expect(every(string()).validate(['first', 'last'])).toBeNull();
	});

	it('should fail when at least one item is not a string', () => {
		expect(every(string()).validate(['first', 1, 'last'])).toMatchSnapshot();
	});

	it('should support custom message', () => {
		expect(every(string(), 'Custom message').validate([1, 'test'])).toMatchSnapshot();
	});

	it('should throw an error when a value is not an array', () => {
		expect(every(string()).validate(1)).toMatchSnapshot();
	});
});
