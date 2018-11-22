export interface ValidationErrorDetail {
	message: string;
	path: string[]; // ['a', '0', 'test'] which is equivalent to 'a[0].test' of the value
	value: any; // the value at current path
}

export interface ValidationError {
	errors: ValidationErrorDetail[];
	rootValue: any; // the root value
}

export interface ValidationContext {
	value: any;
	path: string[];
	rootValue: any;
	generateError: (error: ValidationErrorDetail) => ValidationError;
	generateErrors: (errors: ValidationErrorDetail[]) => ValidationError;
}

export interface CreateValidatorOptions {
	validate: (value: any, ctx: ValidationContext) => null | ValidationError;
}

export interface Validator<ValidValue = any> {
	validate: (value: any, ctx?: ValidationContext) => null | ValidationError;
	isValid: (value: any) => value is ValidValue;
}

export function findFirstError(
	getValidator: (index: number) => Validator,
	getValue: (index: number) => any,
	length: number,
	getContext: (index: number) => ValidationContext
): { error: ValidationError | null; index: number } {
	let i: number = 0;
	let error: ValidationError | null = null;

	while (i < length && error === null) {
		error = getValidator(i).validate(getValue(i), getContext(i));
		i = i + 1;
	}

	return { error, index: i - 1 };
}

export function getFirstErrors(
	getValidator: (index: number) => Validator,
	getValue: (index: number) => any,
	length: number,
	getContext: (index: number) => ValidationContext
): ValidationError[] {
	const errors: ValidationError[] = [];
	let i: number = 0;
	let error: ValidationError | null = null;

	do {
		error = getValidator(i).validate(getValue(i), getContext(i));
		if (error) {
			errors.push(error);
		}
		i = i + 1;
	} while (i < length && error !== null);

	return errors;
}

export function validationErrorToString(error: ValidationError): string {
	return `[${error.errors.map(err => err.message).join(', ')}]`;
}

/**
 * Don't use ${value} inside message when value is invalid
 * @param options
 */
export function createValidator<ValidValue = any>(options: CreateValidatorOptions): Validator<ValidValue> {
	function validate(value: any, ctx?: ValidationContext) {
		const context = ctx || {
			value,
			path: [],
			rootValue: value,
			generateError: error => ({
				errors: [error],
				rootValue: value,
			}),
			generateErrors: errors => ({
				errors,
				rootValue: value,
			}),
		};

		return options.validate(value, context);
	}

	function isValid(value: any): value is ValidValue {
		return validate(value) === null;
	}

	return {
		validate,
		isValid,
	};
}

export function validate(validator: Validator, value: any) {
	const ctx: ValidationContext = {
		value,
		path: [],
		rootValue: value,
		generateError: error => ctx.generateErrors([error]),
		generateErrors: errors => ({
			errors,
			rootValue: value,
		}),
	};

	return validator.validate(value, ctx);
}

export function isValidationError(error: ValidationError | null): error is ValidationError {
	return error !== null;
}

export interface ValidationRef {
	(ctx: ValidationContext): any;
}

export function ref(path: string[]): ValidationRef {
	return (ctx: ValidationContext) => path.reduce((v, key) => v && v[key], ctx.rootValue);
}
