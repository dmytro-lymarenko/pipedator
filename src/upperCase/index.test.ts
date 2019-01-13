import { upperCase } from './index';

describe('upperCase()', () => {
	it('should validate a string in uppercase', () => {
		expect(upperCase().validate('')).toBeNull();
		expect(upperCase().validate('TEST THIS STRING')).toBeNull();
	});

	it('should fail', () => {
		expect(upperCase().validate('TEST This STRING')).toMatchSnapshot();
	});

	it('should support custom message', () => {
		expect(upperCase('Custom message').validate('TEST This STRING')).toMatchSnapshot();
	});
});
