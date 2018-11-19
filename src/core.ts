export interface ValidationError {
	errors: {
		message: string;
		path: string[]; // ['a', '0', 'test'] which is equivalent to 'a[0].test' of the value
		value: any; // the value at current path
	}[];
	rootValue: any; // the root value
}

export interface ValidationContext {
	value: any;
	path: string[];
	message: string;
	rootValue: any;
}

export interface CreateValidatorOptions {
	message: string;
	validate: (value: any, ctx: ValidationContext) => null | ValidationError;
}

export interface Validator {
	validate: (value: any, ctx?: ValidationContext) => null | ValidationError;
	message: string;
}

function findFirstError(
	getValidator: (index: number) => Validator,
	getValue: (index: number) => any,
	length: number,
	getContext: (index: number) => ValidationContext
): ValidationError | null {
	let i: number = 0;
	let error: ValidationError | null = null;

	while (i < length && error === null) {
		error = getValidator(i).validate(getValue(i), getContext(i));
		i = i + 1;
	}

	return error;
}

function findFirstSuccess(
	getValidator: (index: number) => Validator,
	getValue: (index: number) => any,
	length: number,
	getContext: (index: number) => ValidationContext
): ValidationError | null {
	let i: number = 0;
	let error: ValidationError | null = null;

	do {
		error = getValidator(i).validate(getValue(i), getContext(i));
		i = i + 1;
	} while (i < length && error !== null);

	return error;
}

function addMessage(error: ValidationError | null, message?: string): ValidationError | null {
	if (error === null || !message) {
		return error;
	}

	return {
		...error,
		errors: error.errors.map(err => ({ ...err, message })),
	};
}

export function pipe(validators: Validator[], message?: string) {
	return createValidator({
		message: message || `Each validator should succeed: [${validators.map(validator => validator.message).join(', ')}]`,
		validate: (value, ctx) => {
			// find the first error in pipe
			const error = findFirstError(i => validators[i], () => value, validators.length, () => ctx);

			return addMessage(error, message);
		},
	});
}

/**
 * Don't use ${value} inside message when value is invalid
 * @param options
 */
export function createValidator(options: CreateValidatorOptions): Validator {
	function validate(value: any, ctx?: ValidationContext) {
		return options.validate(value, ctx || { value, path: [], message: options.message, rootValue: value });
	}

	return {
		validate,
		message: options.message,
	};
}

export function alternative(validators: Validator[], message?: string) {
	return createValidator({
		message: message || `At least one validator should succeed: [${validators.map(validator => validator.message).join(', ')}]`,
		validate: (value, ctx) => {
			if (validators.length === 0) {
				return null;
			}
			// find the first success validator
			const error = findFirstSuccess(i => validators[i], () => value, validators.length, () => ctx);

			return addMessage(error, message);
		},
	});
}

export function not(validator: Validator, message?: string) {
	return createValidator({
		message: message || `Value should not follow the rule: ${validator.message}`,
		validate: (value, ctx) => {
			const error = validator.validate(value, ctx);

			if (error === null) {
				return {
					errors: [
						{
							value,
							message: ctx.message,
							path: ctx.path,
						},
					],
					rootValue: ctx.rootValue,
				};
			}

			return null;
		},
	});
}

/**
 * value should be an array
 * @param validator
 */
export function every(validator: Validator, message?: string) {
	return createValidator({
		message: message || `Every value should follow the rule: ${validator.message}`,
		// here value should be an array
		validate: (value, ctx) => {
			// find the first error among values
			const error = findFirstError(() => validator, i => value[i], value.length, () => ctx);

			return addMessage(error, message);
		},
	});
}

/**
 * value should be an array
 * @param validator
 */
export function some(validator: Validator, message?: string) {
	return createValidator({
		message: message || `At least one value should follow the rule: ${validator.message}`,
		validate: (value, ctx) => {
			if (value.length === 0) {
				return null;
			}
			// find the first success validator
			const error = findFirstSuccess(() => validator, i => value[i], value.length, () => ctx);

			return addMessage(error, message);
		},
	});
}

export function keys(validator: Validator, message?: string) {
	return createValidator({
		message: message || `Keys should follow the rule: ${validator.message}`,
		validate: (value, ctx) => {
			const error = validator.validate(Object.keys(value), ctx);

			return addMessage(error, message);
		},
	});
}

export function values(validator: Validator, message?: string) {
	return createValidator({
		message: message || `Values should follow the rule: ${validator.message}`,
		validate: (value, ctx) => {
			return valuesByKeys(Object.keys(value), validator).validate(value, ctx);
		},
	});
}

export function valuesByKeys(keys: string[], validator: Validator, message?: string) {
	return createValidator({
		message: message || `Values should follow the rule: ${validator.message}`,
		validate: (value, ctx) => {
			if (keys.length === 0) {
				return null;
			}

			const error = validator.validate(keys.map(key => value[key]), ctx);

			return addMessage(error, message);
		},
	});
}

export function isValidationError(error: ValidationError | null): error is ValidationError {
	return error !== null;
}

export function shape(shape: { [key: string]: Validator }, options?: { onlyFirstError?: boolean }, message?: string) {
	const keys = Object.keys(shape);

	return createValidator({
		message: message || `Value should follow the shape: { ${keys.map(key => `${key}: '${shape[key].message}'`).join('; ')} }`,
		validate: (value, ctx) => {
			if (options && options.onlyFirstError) {
				const error = findFirstError(i => shape[keys[i]], i => value[keys[i]], keys.length, i => ({
					...ctx,
					path: [...ctx.path, keys[i]],
				}));

				return addMessage(error, message);
			}

			const errors = keys
				.map(key =>
					shape[key].validate(value[key], {
						...ctx,
						path: [...ctx.path, key],
					})
				)
				.filter(isValidationError)
				.reduce((res, err) => [...res, ...err.errors], []);

			if (errors.length > 0) {
				return {
					errors,
					rootValue: ctx.rootValue,
				};
			}
			return null;
		},
	});
}

export function ternary(condition: Validator, success: Validator, failure: Validator) {
	return createValidator({
		message: 'asdf',
		validate: (value, ctx) => {
			const error = condition.validate(value, ctx);

			if (error) {
				return failure.validate(value, ctx);
			}

			return success.validate(value, ctx);
		},
	});
}

export function success() {
	return createValidator({
		message: 'Should always success',
		validate: () => null,
	});
}

export function failure() {
	return createValidator({
		message: 'Should always fail',
		validate: (value, ctx) => ({
			rootValue: ctx.rootValue,
			errors: [
				{
					value,
					message: ctx.message,
					path: ctx.path,
				},
			],
		}),
	});
}
