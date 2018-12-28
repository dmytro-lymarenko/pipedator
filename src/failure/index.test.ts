import { failure } from './index';

describe('failure()', () => {
	it('should fail', () => {
		expect(failure().validate(1)).toMatchSnapshot();
	});

	it('should support custom message', () => {
		expect(failure('Custom message').validate(null)).toMatchSnapshot();
	});
});
