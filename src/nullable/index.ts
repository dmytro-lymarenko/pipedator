/**
 * @module validators
 */

import { Validator } from '../core';
import { either } from '../either';
import { equalTo } from '../equalTo';

export function nullable(validator: Validator, message?: string) {
	return either([equalTo(null), validator], message);
}
