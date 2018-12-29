import { Validator } from '../core';
import { abstractShape, AbstractShapeOptions } from '../abstractShape';

export function shape<ValidValue = any>(shape: { [key: string]: Validator }, options?: AbstractShapeOptions, message?: string) {
	const keys = Object.keys(shape);

	return abstractShape<string, ValidValue>(keys, key => shape[key], options, message);
}
