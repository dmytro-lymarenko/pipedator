import { test } from '../test';

export function empty(message?: string) {
	return test(value => value.length === 0, message || 'Value should be empty');
}
