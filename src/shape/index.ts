import { Validator } from '../core';
import { shapeByKeys } from '../shapeByKeys';

export function shape(shape: { [key: string]: Validator }, options?: { onlyFirstError?: boolean }, message?: string) {
	const keys = Object.keys(shape);

	return shapeByKeys(keys, shape, options, message);
}
