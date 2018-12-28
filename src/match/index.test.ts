import { match } from './index';

describe('match()', () => {
	it('should validate a string with provided regexp', () => {
		expect(match(/test/).validate('Some test have passed')).toBeNull();
	});

	it('should fail ', () => {
		expect(match(/test/).validate('Some text have be read')).toMatchSnapshot();
	});

	it('should support custom message', () => {
		expect(match(/test/, 'Custom message').validate('Some text have be read')).toMatchSnapshot();
	});
});
