import { createValidator, ref, Validator } from '../core';
import { success } from '../success';

export function when<ValidValue = any>(path: string[], options: { is: Validator; then: Validator; otherwise?: Validator }) {
	return createValidator<ValidValue>({
		validate: (value, ctx) => {
			const subValue = ref(path)(ctx);

			const requirement = options.is.validate(subValue, ctx);

			if (requirement === null) {
				return options.then.validate(value, ctx);
			}

			const otherwise = options.otherwise || success();

			return otherwise.validate(value, ctx);
		},
	});
}
