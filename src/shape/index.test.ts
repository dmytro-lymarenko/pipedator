import { shape } from './index';
import { number } from '../number';
import { string } from '../string';
import { nullable } from '../nullable';

describe('shape()', () => {
	it('should validate', () => {
		expect(shape({ a: number(), b: string() }).validate({ a: 1, b: 'text' })).toBeNull();
		expect(shape({ a: number(), b: string() }).validate({ a: 1, b: 'text', c: {} })).toBeNull();
	});

	it('should fail', () => {
		expect(shape({ a: number(), b: string() }).validate({ a: '1', b: 'text' })).toMatchSnapshot();
		expect(shape({ a: number(), b: string() }).validate({ a: 1 })).toMatchSnapshot();
	});

	it('should fail and return all errors', () => {
		expect(shape({ a: number(), b: string() }).validate({ a: '1' })).toMatchSnapshot();
	});

	it('should fail and return only the first error', () => {
		expect(shape({ a: number(), b: string() }, { onlyFirstRequirement: true }).validate({ a: '1' })).toMatchSnapshot();
	});

	it('should support custom message', () => {
		expect(shape({ a: number(), b: string() }, undefined, 'Custom message').validate({ a: 1 })).toMatchSnapshot();
	});

	it('should support wrapping validators', () => {
		expect(
			shape({ a: number(), b: string() }, { wrapValidators: validator => nullable(validator) }).validate({ a: null, b: 'text' })
		).toBeNull();
	});
});
