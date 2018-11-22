import { Validator } from '../core';
import { either } from '../either';
import { equalTo } from '../equalTo';

export function optional(validator: Validator, message?: string) {
	return either([equalTo(undefined), validator], message);
}
