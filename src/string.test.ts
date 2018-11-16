import { string, empty } from './string';

describe('string()', () => {
	it('should validate a string', () => {
		expect(string().validate('')).toBeNull();
	});

	it('should return an error for non-string values', () => {
		expect(string().validate(5)).not.toBeNull();
		expect(string().validate({})).not.toBeNull();
		expect(string().validate([])).not.toBeNull();
		expect(string().validate(() => {})).not.toBeNull();
		expect(string().validate(null)).not.toBeNull();
		expect(string().validate(undefined)).not.toBeNull();
	});
});

describe('empty()', () => {
	it('should validate an empty string', () => {
		expect(empty().validate('')).toBeNull();
	});

	it('should validate an empty array', () => {
		expect(empty().validate([])).toBeNull();
	});
});
