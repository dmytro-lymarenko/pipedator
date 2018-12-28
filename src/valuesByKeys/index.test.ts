import { valuesByKeys } from './index';
import { match } from '../match';
import { every } from '../every';

describe('valuesByKeys()', () => {
	it('should validate', () => {
		expect(valuesByKeys(['a', 'b'], every(match(/^test/))).validate({ a: 'testA', b: 'testB' })).toBeNull();
		expect(valuesByKeys(['a', 'b'], every(match(/^test/))).validate({ a: 'testA', b: 'testB', c: 5 })).toBeNull();
	});

	it('should fail', () => {
		expect(valuesByKeys(['a', 'b'], every(match(/^test/))).validate({ a: 'testA', b: 5 })).toMatchSnapshot();
	});

	it('should support custom message', () => {
		expect(valuesByKeys(['a', 'b'], every(match(/^test/)), 'Custom message').validate({ a: 'testA', b: 5 })).toMatchSnapshot();
	});
});
