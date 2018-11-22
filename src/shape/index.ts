import { Validator } from '../core';
import { abstractShape, AbstractShapeOptions } from '../abstractShape';

export function shape(shape: { [key: string]: Validator }, options?: AbstractShapeOptions, message?: string) {
	const keys = Object.keys(shape);

	return abstractShape(keys, key => shape[key], options, message);
}
