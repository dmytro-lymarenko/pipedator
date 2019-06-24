import { Validator, createValidator } from '../core';

export function prop<ValidValue = any>(propName: string, validator: Validator<ValidValue>) {
	return createValidator({
		validate: (value, ctx) => {
			const propValue = value !== undefined && value !== null ? value[propName] : undefined;

			return validator.validate(propValue, {
				...ctx,
				path: [...ctx.path, propName],
			});
		},
	});
}
