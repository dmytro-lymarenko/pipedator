import { less } from './index';
import { ref } from '../core';
import { number } from '../number';
import { shape } from '../shape';

describe('less()', () => {
	it('should validate when value is less than limit', () => {
		expect(less(5).validate(1)).toBeNull();
	});

	it('should validate when value is less than limit which is a reference', () => {
		expect(shape({ a: number(), b: less(ref(['a'])) }).validate({ a: 5, b: 1 })).toBeNull();
	});

	it('should fail when value is not less than limit which is a reference', () => {
		expect(shape({ a: number(), b: less(ref(['a'])) }).validate({ a: 1, b: 5 })).toMatchSnapshot();
	});

	it('should fail when value is not less than limit', () => {
		expect(less(1).validate(5)).toMatchSnapshot();
		expect(less(5).validate(5)).toMatchSnapshot();
	});

	it('should support custom message', () => {
		expect(less(1, 'Custom message').validate(5)).toMatchSnapshot();
	});
});
