import { test } from '../test';

export function failure<ValidValue = any>(message?: string) {
	return test<ValidValue>(() => false, message || 'Should always fail');
}
