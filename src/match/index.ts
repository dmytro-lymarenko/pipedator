import { test } from '../test';

export function match<ValidValue = any>(regexp: RegExp, message?: string) {
	return test<ValidValue>(value => regexp.test(value), message || `Value should match regexp: ${regexp}`);
}
