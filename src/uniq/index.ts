import { test } from '../test';
import { Validator } from '../core';

interface IsEqual {
	(a: any, b: any): boolean;
}

const defaultComparator: IsEqual = (a, b) => a === b;

export function uniq<ValidValue = any>(): Validator<ValidValue>;
export function uniq<ValidValue = any>(isEqual: IsEqual): Validator<ValidValue>;
export function uniq<ValidValue = any>(message: string): Validator<ValidValue>;
export function uniq<ValidValue = any>(isEqual: IsEqual, message: string): Validator<ValidValue>;

export function uniq<ValidaValue = any>(arg1?: any, arg2?: any) {
	const isEqual: IsEqual = (typeof arg1 === 'function' && arg1) || defaultComparator;
	const message: string | undefined = (typeof arg1 === 'string' && arg1) || arg2;

	return test<ValidaValue>((value: any[]) => {
		if (value.length < 2) {
			return true;
		}

		const uniqItems: any[] = [value[0]];

		let i = 1;

		while (i < value.length) {
			const item = value[i];

			if (uniqItems.findIndex(el => isEqual(el, item)) !== -1) {
				return false;
			}

			uniqItems.push(item);
			i = i + 1;
		}

		return true;
	}, message || 'Array should contain uniq items');
}
