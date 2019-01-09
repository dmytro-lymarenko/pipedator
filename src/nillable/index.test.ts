import { nillable } from './index';
import { string } from '../string';

describe('nillable()', () => {
	it('should validate a string', () => {
		expect(nillable(string()).validate('Some test have passed')).toBeNull();
	});

	it('should validate a string when it is actually undefined', () => {
		expect(nillable(string()).validate(undefined)).toBeNull();
	});

	it('should validate a string when it is actually null', () => {
		expect(nillable(string()).validate(null)).toBeNull();
	});

	it('should fail', () => {
		expect(nillable(string()).validate(1)).toMatchSnapshot();
	});

	it('should support custom message', () => {
		expect(nillable(string(), 'Custom message').validate(1)).toMatchSnapshot();
	});
});
