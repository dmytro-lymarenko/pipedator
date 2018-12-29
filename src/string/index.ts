import { test } from '../test';

export function string<ValidValue = any>(message?: string) {
	return test<ValidValue>(value => typeof value === 'string', message || 'Value should be a string');
}
