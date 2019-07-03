import { Validator } from '../core';
import { either } from '../either';
import { equalTo } from '../equalTo';

export function optional<V>(validator: Validator<V>): Validator<V | undefined> {
	return either(equalTo(undefined), validator);
}
