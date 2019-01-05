import { Validator } from '../core';
import { abstractShape, AbstractShapeOptions } from '../abstractShape';

export function tuple<ValidValue = any>(tuple: Validator[], options?: AbstractShapeOptions, message?: string) {
	const keys = tuple.map((_, i) => i);

	return abstractShape<number, ValidValue>(
		keys,
		key => tuple[key],
		{ ...options, openedBracket: '[', closedBracket: ']' },
		message
	);
}
