import { number } from './index';

describe('number()', () => {
	it('should validate a number', () => {
		expect(number().validate(1)).toBeNull();
		expect(number().validate(NaN)).toBeNull();
	});

	it('should return an error for non-number values', () => {
		expect(number().validate('5')).toMatchSnapshot();
		expect(number().validate({})).toMatchSnapshot();
		expect(number().validate([])).toMatchSnapshot();
		expect(number().validate(() => {})).toMatchSnapshot();
		expect(number().validate(null)).toMatchSnapshot();
		expect(number().validate(undefined)).toMatchSnapshot();
	});

	it('should support custom message', () => {
		expect(number('Custom message').validate('5')).toMatchSnapshot();
	});
});
