import { Validator } from '../core';
import { either } from '../either';
import { equalTo } from '../equalTo';

export function nullable<V>(validator: Validator<V>): Validator<V | null> {
	return either(equalTo(null), validator);
}
