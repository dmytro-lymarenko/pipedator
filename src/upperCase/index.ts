import { test } from '../test';

export function upperCase<ValidValue = any>(message?: string) {
	return test<ValidValue>((value: string) => value.toLocaleUpperCase() === value, message || 'Value should be in uppercase');
}
