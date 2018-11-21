import { Validator } from '../core';
import { abstractShape } from '../abstractShape';

export function tuple(tuple: Validator[], options?: { onlyFirstError?: boolean }, message?: string) {
	const keys = tuple.map((_, i) => i);

	return abstractShape(keys, key => tuple[key], options, message);
}
