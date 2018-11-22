import { createValidator, ref, Validator } from '../core';
import { success } from '../success';

export function when(path: string[], options: { is: Validator; then: Validator; otherwise?: Validator }) {
	return createValidator({
		validate: (value, ctx) => {
			const subValue = ref(path)(ctx);

			const error = options.is.validate(subValue, ctx);

			if (error === null) {
				return options.then.validate(value, ctx);
			}

			const otherwise = options.otherwise || success();

			return otherwise.validate(value, ctx);
		},
	});
}
