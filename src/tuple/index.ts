import { Validator } from '../core';
import { abstractShape, AbstractShapeOptions } from '../abstractShape';

export function tuple(tuple: Validator[], options?: AbstractShapeOptions, message?: string) {
	const keys = tuple.map((_, i) => i);

	return abstractShape(keys, key => tuple[key], options, message);
}
