import { ternary } from './index';
import { success } from '../success';
import { failure } from '../failure';

describe('ternary()', () => {
	it('should validate when both condition and success succeed', () => {
		expect(ternary(success(), success(), success()).validate(1)).toBeNull();
		expect(ternary(success(), success(), failure()).validate(1)).toBeNull();
	});

	it('should validate when condition fails but failure succeed', () => {
		expect(ternary(failure(), success(), success()).validate(1)).toBeNull();
		expect(ternary(failure(), failure(), success()).validate(1)).toBeNull();
	});

	it('should fail with correct message when condition succeeds but success fails', () => {
		expect(ternary(success(), failure('Correct message'), success()).validate(1)).toMatchSnapshot();
		expect(ternary(success(), failure('Correct message'), failure('Incorrect message')).validate(1)).toMatchSnapshot();
	});

	it('should fail with correct message when both condition and failure fail', () => {
		expect(ternary(failure('Incorrect message'), success(), failure('Correct message')).validate(1)).toMatchSnapshot();
		expect(
			ternary(failure('Incorrect message'), failure('Incorrect message'), failure('Correct message')).validate(1)
		).toMatchSnapshot();
	});
});
