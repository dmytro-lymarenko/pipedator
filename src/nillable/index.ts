import { Validator } from '../core';
import { either } from '../either';
import { equalTo } from '../equalTo';

export function nillable<V>(validator: Validator<V>): Validator<V | null | undefined> {
	return either(equalTo(undefined), equalTo(null), validator);
}
