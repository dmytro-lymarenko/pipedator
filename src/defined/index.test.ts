import { defined } from './index';

describe('defined()', () => {
	it('should validate a defined value', () => {
		expect(defined().validate('')).toBeNull();
		expect(defined().validate(0)).toBeNull();
		expect(defined().validate([])).toBeNull();
		expect(defined().validate({})).toBeNull();
	});

	it('should fail when value either undefined or null', () => {
		expect(defined().validate(null)).toMatchSnapshot();
		expect(defined().validate(undefined)).toMatchSnapshot();
	});

	it('should support custom message', () => {
		expect(defined('Custom message').validate(undefined)).toMatchSnapshot();
	});
});
