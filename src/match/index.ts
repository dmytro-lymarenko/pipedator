import { test } from '../test';

export function match(regexp: RegExp, message?: string) {
	return test(value => regexp.test(value), message || `Value should match regexp: ${regexp}`);
}
