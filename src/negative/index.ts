import { test } from '../test';

export function negative<ValidValue = any>(message?: string) {
	return test<ValidValue>(value => value < 0, message || 'Value should be negative');
}
