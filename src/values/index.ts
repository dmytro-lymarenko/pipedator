import { createValidator, Validator } from '../core';
import { valuesByKeys } from '../valuesByKeys';

export function values<ValidValue = any>(validator: Validator, message?: string) {
	return createValidator<ValidValue>({
		validate: (value, ctx) => {
			return valuesByKeys(Object.keys(value), validator, message).validate(value, ctx);
		},
	});
}
