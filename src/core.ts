export interface ValidationError {
	message: string;
	path: string[]; // ['a', '0', 'test'] which is equivalent to 'a[0].test' of the value
}

export interface ValidationContext {
	value: any;
	path: string[];
}

export interface CreateValidatorOptions {
	validate: (value: any, ctx: ValidationContext) => null | ValidationError;
}

export interface Validator {
	validate: (value: any, ctx?: ValidationContext) => null | ValidationError;
	pipe: (...validators: Validator[]) => Validator;
}

/**
 * Don't use ${value} inside message when value is invalid
 * @param options
 */
export function createValidator(options: CreateValidatorOptions): Validator {
	function validate(value: any, ctx?: ValidationContext) {
		// Should we catch errors?
		// try {
		// 	return options.validate(value);
		// } catch (e) {
		// 	return `Error happend while validating: ${e}`;
		// }
		return options.validate(value, ctx || { value, path: [] });
	}

	function pipe(...validators: Validator[]) {
		return createValidator({
			validate: (value, ctx) => {
				const ownCheck = validate(value, ctx);

				if (ownCheck !== null) {
					return ownCheck;
				}

				// find the first error in pipe
				let i: number = 0;
				let message: ValidationError | null = null;

				while (i < validators.length && message === null) {
					message = validators[i].validate(value, ctx);
					i = i + 1;
				}

				return message;
			},
		});
	}

	return {
		validate,
		pipe,
	};
}
