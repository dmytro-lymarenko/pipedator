import { createValidator } from '../core';
import { singleRequirementFactory } from '../core/requirements';

export function test<ValidValue = any>(isValid: (value: any) => boolean, message: string) {
	return createValidator<ValidValue>({
		validate: (value, ctx) => (isValid(value) ? null : singleRequirementFactory(message)(ctx.path, value)),
	});
}
