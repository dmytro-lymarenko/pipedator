import { array } from './index';

describe('array()', () => {
	it('should validate an array', () => {
		expect(array().validate([])).toBeNull();
	});

	it('should return an error for non-array values', () => {
		expect(array().validate(5)).toMatchSnapshot();
		expect(array().validate({})).toMatchSnapshot();
		expect(array().validate('array')).toMatchSnapshot();
		expect(array().validate(() => {})).toMatchSnapshot();
		expect(array().validate(null)).toMatchSnapshot();
		expect(array().validate(undefined)).toMatchSnapshot();
	});

	it('should support custom message', () => {
		expect(array('Custom message').validate(5)).toMatchSnapshot();
	});
});
