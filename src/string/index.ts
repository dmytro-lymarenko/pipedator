import { test } from '../test';

export function string(message?: string) {
	return test(value => typeof value === 'string', message || 'Value should be a string');
}
