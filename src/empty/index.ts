import { test } from '../test';

export function empty<ValidValue = any>(message?: string) {
	return test<ValidValue>(value => value.length === 0, message || 'Value should be empty');
}
