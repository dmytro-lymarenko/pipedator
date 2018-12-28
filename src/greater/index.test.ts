import { greater } from './index';
import { ref } from '../core';
import { number } from '../number';
import { shape } from '../shape';

describe('greater()', () => {
	it('should validate when value is greater than limit', () => {
		expect(greater(1).validate(5)).toBeNull();
	});

	it('should validate when value is greater than limit which is a reference', () => {
		expect(shape({ a: number(), b: greater(ref(['a'])) }).validate({ a: 1, b: 5 })).toBeNull();
	});

	it('should fail when value is not greater than limit which is a reference', () => {
		expect(shape({ a: number(), b: greater(ref(['a'])) }).validate({ a: 5, b: 1 })).toMatchSnapshot();
	});

	it('should fail when value is not greater than limit', () => {
		expect(greater(5).validate(1)).toMatchSnapshot();
		expect(greater(5).validate(5)).toMatchSnapshot();
	});

	it('should support custom message', () => {
		expect(greater(5, 'Custom message').validate(1)).toMatchSnapshot();
	});
});
