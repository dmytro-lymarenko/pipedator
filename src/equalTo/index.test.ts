import { equalTo } from './index';
import { ref } from '../core';
import { string } from '../string';
import { shape } from '../shape';

describe('equalTo()', () => {
	it('should validate when value is equal to validValue', () => {
		expect(equalTo('test').validate('test')).toBeNull();
	});

	it('should validate when value is equal to validValue which is a reference', () => {
		expect(shape({ a: string(), b: equalTo(ref(['a'])) }).validate({ a: 'test', b: 'test' })).toBeNull();
	});

	it('should fail when value is not equal to validValue which is a reference', () => {
		expect(shape({ a: string(), b: equalTo(ref(['a'])) }).validate({ a: 'test', b: 'text' })).toMatchSnapshot();
	});

	it('should fail when value is not equal to validValue', () => {
		expect(equalTo('test').validate('text')).toMatchSnapshot();
	});

	it('should support custom message', () => {
		expect(equalTo(1, 'Custom message').validate('test')).toMatchSnapshot();
	});
});
