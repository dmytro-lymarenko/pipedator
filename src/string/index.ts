import { Validator } from '../core';
import { test } from '../test';

function isString(value: any): value is string {
	return typeof value === 'string';
}

export function string(/* ...validators: Validator<string>[] */): Validator<string> {
	return test<string>(isString, 'Value should be a string');
}
