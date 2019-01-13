import { test } from '../test';

export function defined<ValidValue = any>(message?: string) {
	return test<ValidValue>(value => value !== undefined && value !== null, message || 'Value should be defined');
}
