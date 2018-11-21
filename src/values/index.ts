/**
 * @module validators
 */

import { createValidator, Validator } from '../core';
import { valuesByKeys } from '../valuesByKeys';

export function values(validator: Validator, message?: string) {
	return createValidator({
		validate: (value, ctx) => {
			return valuesByKeys(Object.keys(value), validator, message).validate(value, ctx);
		},
	});
}
