import { prop } from './index';
import { equalTo, string, number } from '..';

describe('prop()', () => {
	it('should validate an prop', () => {
		expect(prop('length', equalTo(3)).validate([1, 2, 'string'])).toBeNull();
		expect(prop('a', prop('b', string())).validate({ a: { b: 'some string' } })).toBeNull();
	});

	it('should return an error for non-prop values', () => {
		expect(prop('length', number()).validate(5)).toMatchSnapshot();
	});
});
