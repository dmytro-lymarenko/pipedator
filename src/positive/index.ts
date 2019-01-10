import { test } from '../test';

export function positive<ValidValue = any>(message?: string) {
	return test<ValidValue>(value => value > 0, message || 'Value should be positive');
}
