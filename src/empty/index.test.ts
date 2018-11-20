import { empty } from './index';

describe('empty()', () => {
	it('should validate an empty string', () => {
		expect(empty().validate('')).toBeNull();
	});

	it('should validate an empty array', () => {
		expect(empty().validate([])).toBeNull();
	});
});
