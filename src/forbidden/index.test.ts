import { forbidden } from './index';

describe('forbidden()', () => {
	it('should validate undefined', () => {
		expect(forbidden().validate(undefined)).toBeNull();
	});

	it('should fail', () => {
		expect(forbidden().validate(1)).toMatchSnapshot();
		expect(forbidden().validate(null)).toMatchSnapshot();
	});

	it('should support custom message', () => {
		expect(forbidden('Custom message').validate(null)).toMatchSnapshot();
	});
});
