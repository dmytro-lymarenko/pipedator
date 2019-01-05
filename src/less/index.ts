import { createValidator, ValidationRef } from '../core';
import { singleRequirementFactory } from '../core/requirements';

export function less<ValidValue = any>(limit: number | ValidationRef, message?: string) {
	return createValidator<ValidValue>({
		validate: (value, ctx) => {
			const v = typeof limit === 'number' ? limit : limit(ctx);

			return value < v ? null : singleRequirementFactory(message || `Value should be less than ${v}`)(ctx.path, value);
		},
	});
}
