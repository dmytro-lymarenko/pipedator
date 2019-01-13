import { lowerCase } from './index';

describe('lowerCase()', () => {
	it('should validate a string in lowercase', () => {
		expect(lowerCase().validate('')).toBeNull();
		expect(lowerCase().validate('test this string')).toBeNull();
	});

	it('should fail', () => {
		expect(lowerCase().validate('test This string')).toMatchSnapshot();
	});

	it('should support custom message', () => {
		expect(lowerCase('Custom message').validate('test This string')).toMatchSnapshot();
	});
});
