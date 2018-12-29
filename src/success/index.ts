import { createValidator } from '../core';

export function success<ValidValue = any>() {
	return createValidator<ValidValue>({
		validate: () => null,
	});
}
