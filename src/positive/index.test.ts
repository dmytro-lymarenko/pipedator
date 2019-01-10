import { positive } from './index';

describe('positive()', () => {
	it('should validate', () => {
		expect(positive().validate(4)).toBeNull();
	});

	it('should fail', () => {
		expect(positive().validate(0)).toMatchSnapshot();
		expect(positive().validate(-4)).toMatchSnapshot();
	});

	it('should support custom message', () => {
		expect(positive('Custom message').validate(-1)).toMatchSnapshot();
	});
});
