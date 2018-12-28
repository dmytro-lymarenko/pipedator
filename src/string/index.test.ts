import { string } from './index';

describe('string()', () => {
	it('should validate a string', () => {
		expect(string().validate('')).toBeNull();
	});

	it('should return an error for non-string values', () => {
		expect(string().validate(5)).toMatchSnapshot();
		expect(string().validate({})).toMatchSnapshot();
		expect(string().validate([])).toMatchSnapshot();
		expect(string().validate(() => {})).toMatchSnapshot();
		expect(string().validate(null)).toMatchSnapshot();
		expect(string().validate(undefined)).toMatchSnapshot();
	});

	it('should support custom message', () => {
		expect(string('Custom message').validate(5)).toMatchSnapshot();
	});
});
