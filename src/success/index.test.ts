import { success } from './index';

describe('success()', () => {
	it('should validate any value', () => {
		expect(success().validate(1)).toBeNull();
		expect(success().validate('Some text')).toBeNull();
	});
});
