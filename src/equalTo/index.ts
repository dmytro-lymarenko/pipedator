import { createValidator, ValidationRef } from '../core';
import { singleRequirementFactory } from '../core/requirements';

export function equalTo<ValidValue = any>(validValue: any | ValidationRef, message?: string) {
	return createValidator<ValidValue>({
		validate: (value, ctx) => {
			const v = typeof validValue === 'function' ? validValue(ctx) : validValue;

			return value === v ? null : singleRequirementFactory(message || `Value should equal to ${v}`)(ctx.path, value);
		},
	});
}
