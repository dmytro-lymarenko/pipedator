import { Validator } from '../core';
import { either } from '../either';
import { equalTo } from '../equalTo';

export function nullable<ValidValue = any>(validator: Validator, message?: string) {
	return either<ValidValue>([equalTo(null), validator], message);
}
