import { test } from '../test';

export function lowerCase<ValidValue = any>(message?: string) {
	return test<ValidValue>((value: string) => value.toLocaleLowerCase() === value, message || 'Value should be in lowercase');
}
