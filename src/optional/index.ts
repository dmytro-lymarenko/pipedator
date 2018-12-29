import { Validator } from '../core';
import { either } from '../either';
import { equalTo } from '../equalTo';

export function optional<ValidValue = any>(validator: Validator, message?: string) {
	return either<ValidValue>([equalTo(undefined), validator], message);
}
