import { values } from './index';
import { match } from '../match';
import { every } from '../every';

describe('values()', () => {
	it('should validate', () => {
		expect(values(every(match(/^test/))).validate({ a: 'testA', b: 'testB' })).toBeNull();
	});

	it('should fail', () => {
		expect(values(every(match(/^test/))).validate({ a: 'testA', b: 'testB', c: 5 })).toMatchSnapshot();
	});

	it('should support custom message', () => {
		expect(values(every(match(/^test/)), 'Custom message').validate({ a: 'testA', b: 5 })).toMatchSnapshot();
	});
});
