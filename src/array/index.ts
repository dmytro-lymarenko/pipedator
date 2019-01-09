import { test } from '../test';

export function array<ValidValue = any>(message?: string) {
	return test<ValidValue>(value => Array.isArray(value), message || 'Value should be an array');
}
