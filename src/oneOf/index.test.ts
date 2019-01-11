import { oneOf } from './index';
import { ref } from '../core';
import { string } from '../string';
import { shape } from '../shape';

describe('oneOf()', () => {
	it('should validate when value is one of allowedValues', () => {
		expect(oneOf(['ts', 'js']).validate('ts')).toBeNull();
	});

	it('should validate when value is one of allowedValues which is a reference', () => {
		expect(shape({ a: string(), b: oneOf(['ts', ref(['a'])]) }).validate({ a: 'js', b: 'ts' })).toBeNull();
		expect(shape({ a: string(), b: oneOf(['ts', ref(['a'])]) }).validate({ a: 'js', b: 'js' })).toBeNull();
	});

	it('should fail when value is not one of allowedValues which is a reference', () => {
		expect(shape({ a: string(), b: oneOf(['ts', ref(['a'])]) }).validate({ a: 'test', b: 'text' })).toMatchSnapshot();
	});

	it('should fail when value is not one of allowedValues', () => {
		expect(oneOf(['ts', 'js']).validate('css')).toMatchSnapshot();
	});

	it('should support custom message', () => {
		expect(oneOf(['ts', 'js'], 'Custom message').validate('php')).toMatchSnapshot();
	});
});
