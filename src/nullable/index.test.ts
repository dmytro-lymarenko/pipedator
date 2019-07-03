import { nullable } from './index';
import { string } from '../string';

describe('nullable()', () => {
	it('should validate a string', () => {
		expect(nullable(string()).validate('Some test have passed')).toBeNull();
	});

	it('should validate a string when it is actually null', () => {
		expect(nullable(string()).validate(null)).toBeNull();
	});

	it('should fail', () => {
		expect(nullable(string()).validate(1)).toMatchSnapshot();
	});
});
