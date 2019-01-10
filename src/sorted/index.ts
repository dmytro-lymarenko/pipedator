import { createValidator, getCurrentPath, Validator } from '../core';

type SortedDirection = 'asc' | 'desc';

interface SortedComparator {
	(a: any, b: any): number; // should return negative value when a < b
}

export function sorted<ValidValue = any>(
	direction: SortedDirection | SortedComparator,
	message?: string
): Validator<ValidValue> {
	const comparator =
		direction === 'asc' ? (a: any, b: any) => a - b : direction === 'desc' ? (a: any, b: any) => b - a : direction;

	return createValidator<ValidValue>({
		validate: (value: any[], ctx) => {
			if (value.length < 2) {
				return null;
			}

			let i = 0;

			while (i < value.length - 1 && comparator(value[i], value[i + 1]) <= 0) {
				i = i + 1;
			}

			if (i === value.length - 1) {
				// right order
				return null;
			}

			return {
				path: getCurrentPath(ctx),
				message: message || 'Array should be sorted',
				children: null,
			};
		},
	});
}
