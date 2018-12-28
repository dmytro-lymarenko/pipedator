import { test } from '../test';

export function number(message?: string) {
	return test(value => typeof value === 'number', message || 'Value should be a number');
}
