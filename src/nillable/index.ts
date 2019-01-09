import { Validator } from '../core';
import { either } from '../either';
import { equalTo } from '../equalTo';

export function nillable<ValidValue = any>(validator: Validator, message?: string) {
	return either<ValidValue>([equalTo(undefined), equalTo(null), validator], message);
}
