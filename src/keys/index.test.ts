import { keys } from './index';
import { match } from '../match';
import { every } from '../every';

describe('keys()', () => {
	it('should validate', () => {
		expect(keys(every(match(/^test/))).validate({ testA: 5, testB: 'text' })).toBeNull();
	});

	it('should fail', () => {
		expect(keys(every(match(/^test/))).validate({ testA: 5, b: 'text' })).toMatchSnapshot();
	});

	it('should support custom message', () => {
		expect(keys(every(match(/^test/)), 'Custom message').validate({ testA: 5, b: 'text' })).toMatchSnapshot();
	});
});
