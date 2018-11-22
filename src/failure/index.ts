import { test } from '../test';

export function failure(message?: string) {
	return test(() => false, message || 'Should always fail');
}
