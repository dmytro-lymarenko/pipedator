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

function findFirstError(
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

function getFirstErrors(
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

function validationErrorToString(error: ValidationError): string {
	return `[${error.errors.map(err => err.message).join(', ')}]`;
}

export function pipe(validators: Validator[], message?: string) {
	return createValidator({
		validate: (value, ctx) => {
			// find the first error in pipe
			const { error } = findFirstError(i => validators[i], () => value, validators.length, () => ctx);

			if (error && message) {
				return ctx.generateError({
					value,
					message,
					path: ctx.path,
				});
			}

			return error;
		},
	});
}

export const both = pipe;

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

export function alternative(validators: Validator[], message?: string) {
	return createValidator({
		validate: (value, ctx) => {
			if (validators.length === 0) {
				return null;
			}
			// find the first success validator
			const errors = getFirstErrors(i => validators[i], () => value, validators.length, () => ctx);

			if (errors.length === validators.length) {
				// here all validators returned an error
				return ctx.generateError({
					value,
					message:
						message ||
						`At least one validator should succeed: [${errors.map(error => validationErrorToString(error)).join(' OR ')}]`,
					path: ctx.path,
				});
			}

			return null;
		},
	});
}

export const alt = alternative;
export const either = alternative;

/**
 * value should be an array
 * @param validator
 */
export function every(validator: Validator, message?: string) {
	return createValidator({
		// here value should be an array
		validate: (value, ctx) => {
			// find the first error among values
			const { error } = findFirstError(() => validator, i => value[i], value.length, () => ctx);

			if (error) {
				return ctx.generateError({
					value,
					message: message || `Every value should follow the rule: ${validationErrorToString(error)}`,
					path: ctx.path,
				});
			}

			return null;
		},
	});
}

/**
 * value should be an array
 * @param validator
 */
export function some(validator: Validator, message?: string) {
	return createValidator({
		validate: (value, ctx) => {
			if (value.length === 0) {
				return null;
			}
			// find the first success validator
			const errors = getFirstErrors(() => validator, i => value[i], value.length, () => ctx);

			if (errors.length === value.length) {
				// here all values failed
				return ctx.generateError({
					value,
					message:
						message ||
						`At least one value should follow the rule: [${errors.map(error => validationErrorToString(error)).join(' OR ')}]`,
					path: ctx.path,
				});
			}

			return null;
		},
	});
}

export function keys(validator: Validator, message?: string) {
	return createValidator({
		validate: (value, ctx) => {
			const error = validator.validate(Object.keys(value), ctx);

			if (error) {
				return ctx.generateError({
					value,
					message: message || `Keys should follow the rule: ${validationErrorToString(error)}`,
					path: ctx.path,
				});
			}

			return null;
		},
	});
}

export function values(validator: Validator, message?: string) {
	return createValidator({
		validate: (value, ctx) => {
			return valuesByKeys(Object.keys(value), validator, message).validate(value, ctx);
		},
	});
}

export function valuesByKeys(keys: string[], validator: Validator, message?: string) {
	return createValidator({
		validate: (value, ctx) => {
			if (keys.length === 0) {
				return null;
			}

			const error = validator.validate(keys.map(key => value[key]), ctx);

			if (error) {
				return ctx.generateError({
					value,
					message: message || `Values should follow the rule: ${validationErrorToString(error)}`,
					path: ctx.path,
				});
			}

			return null;
		},
	});
}

export function isValidationError(error: ValidationError | null): error is ValidationError {
	return error !== null;
}

export function shape(shape: { [key: string]: Validator }, options?: { onlyFirstError?: boolean }, message?: string) {
	const keys = Object.keys(shape);

	return shapeByKeys(keys, shape, options, message);
}

export function shapeByKeys(
	keys: string[],
	shape: { [key: string]: Validator },
	options?: { onlyFirstError?: boolean },
	message?: string
) {
	return createValidator({
		validate: (value, ctx) => {
			if (options && options.onlyFirstError) {
				const { error } = findFirstError(i => shape[keys[i]], i => value[keys[i]], keys.length, i => ({
					...ctx,
					path: [...ctx.path, keys[i]],
				}));

				if (error && message) {
					return ctx.generateError({
						value,
						message,
						path: ctx.path,
					});
				}

				return error;
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
				if (message) {
					return ctx.generateError({
						value,
						message,
						path: ctx.path,
					});
				}

				return ctx.generateErrors(errors);
			}

			return null;
		},
	});
}

export function ternary(condition: Validator, success: Validator, failure: Validator) {
	return createValidator({
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
		validate: () => null,
	});
}

export function failure() {
	return createValidator({
		validate: (value, ctx) =>
			ctx.generateError({
				value,
				message: 'Should always fail',
				path: ctx.path,
			}),
	});
}

// export function tuple(tuple: Validator[], options?: { onlyFirstError?: boolean }, message?: string) {
// 	const keys = tuple.map((_, i) => i.toString());

// 	return shapeByKeys(keys, tuple, options, message);
// }

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

export function ref(path: string[]) {
	return (ctx: ValidationContext) => path.reduce((v, key) => v && v[key], ctx.rootValue);
}

export function valid(validValue: any | ((ctx: ValidationContext) => any)) {
	return createValidator({
		validate: (value, ctx) => {
			const v = typeof validValue === 'function' ? validValue(ctx) : validValue;

			return value === v
				? null
				: ctx.generateError({
						value,
						message: `Value should equal to ${validValue}`,
						path: ctx.path,
				  });
		},
	});
}

export const equalTo = valid;

export function greater(min: number | ((ctx: ValidationContext) => any)) {
	return createValidator({
		validate: (value, ctx) => {
			const v = typeof min === 'number' ? min : min(ctx);

			return value > v
				? null
				: ctx.generateError({
						value,
						message: `Value should be greater than ${v}`,
						path: ctx.path,
				  });
		},
	});
}
