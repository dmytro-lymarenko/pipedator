import { Validator, either, equalTo } from './core';

export function optional(validator: Validator, message?: string) {
	return either([equalTo(undefined), validator], message);
}
