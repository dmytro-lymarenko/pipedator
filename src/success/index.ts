/**
 * @module validators
 */

import { createValidator } from '../core';

export function success() {
	return createValidator({
		validate: () => null,
	});
}
