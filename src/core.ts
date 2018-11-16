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

export function pipe(...validators: Validator[]) {
	return createValidator({
		validate: (value, ctx) => {
			// find the first error in pipe
			let i: number = 0;
			let error: ValidationError | null = null;

			while (i < validators.length && error === null) {
				error = validators[i].validate(value, ctx);
				i = i + 1;
			}

			return error;
		},
	});
}

/**
 * Don't use ${value} inside message when value is invalid
 * @param options
 */
export function createValidator(options: CreateValidatorOptions): Validator {
	function validate(value: any, ctx?: ValidationContext) {
		return options.validate(value, ctx || { value, path: [] });
	}

	return {
		validate,
		pipe: (...validators) =>
			pipe(
				createValidator({ validate }),
				...validators
			),
	};
}
