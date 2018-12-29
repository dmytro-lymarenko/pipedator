import { test } from '../test';

export function number<ValidValue = any>(message?: string) {
	return test<ValidValue>(value => typeof value === 'number', message || 'Value should be a number');
}
