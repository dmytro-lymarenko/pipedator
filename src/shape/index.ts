/**
 * @module validators
 */

import { Validator } from '../core';
import { abstractShape } from '../abstractShape';

export function shape(shape: { [key: string]: Validator }, options?: { onlyFirstError?: boolean }, message?: string) {
	const keys = Object.keys(shape);

	return abstractShape(keys, key => shape[key], options, message);
}
