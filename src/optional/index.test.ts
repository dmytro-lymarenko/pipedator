import { optional } from './index';
import { string } from '../string';

describe('optional()', () => {
	it('should validate a string', () => {
		expect(optional(string()).validate('Some test have passed')).toBeNull();
	});

	it('should validate a string when it is actually undefined', () => {
		expect(optional(string()).validate(undefined)).toBeNull();
	});

	it('should fail', () => {
		expect(optional(string()).validate(1)).toMatchSnapshot();
	});
});
