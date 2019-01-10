import { negative } from './index';

describe('negative()', () => {
	it('should validate', () => {
		expect(negative().validate(-4)).toBeNull();
	});

	it('should fail', () => {
		expect(negative().validate(0)).toMatchSnapshot();
		expect(negative().validate(4)).toMatchSnapshot();
	});

	it('should support custom message', () => {
		expect(negative('Custom message').validate(1)).toMatchSnapshot();
	});
});
