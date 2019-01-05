import { Requirement } from './requirements';

export interface ValidationError {
	path: string[]; // ['a', '0', 'test'] which is equivalent to 'a[0].test' of the value
	message: string;
	value: any; // the value at current path
	errors: ValidationError[];
}

export interface ValidationErrorOptions {
	path: string[]; // ['a', '0', 'test'] which is equivalent to 'a[0].test' of the value
	message: string;
	value: any; // the value at current path
	errors?: ValidationError[];
}

export interface GroupedValidationError {
	errors: string[];
	path: string; // an item from the path
	children: GroupedValidationError[] | null;
}

export interface ValidationContext {
	value: any;
	path: string[];
	rootValue: any;
	// generateError: (error: ValidationErrorOptions) => ValidationError;
}

export interface CreateValidatorOptions {
	validate: (value: any, ctx: ValidationContext) => null | Requirement;
}

export interface Validator<ValidValue = any> {
	validate: (value: any, ctx?: ValidationContext) => null | Requirement;
	isValid: (value: any) => value is ValidValue;
}

export function findFirstRequirement(
	getValidator: (index: number) => Validator,
	getValue: (index: number) => any,
	getContext: (index: number) => ValidationContext,
	length: number
): { requirement: Requirement | null; index: number } {
	let i: number = 0;
	let requirement: Requirement | null = null;

	while (i < length && requirement === null) {
		requirement = getValidator(i).validate(getValue(i), getContext(i));
		i = i + 1;
	}

	return { requirement, index: i - 1 };
}

export function getFirstRequirements(
	getValidator: (index: number) => Validator,
	getValue: (index: number) => any,
	getContext: (index: number) => ValidationContext,
	length: number
): Requirement[] {
	const requirements: Requirement[] = [];
	let i: number = 0;
	let requirement: Requirement | null = null;

	do {
		requirement = getValidator(i).validate(getValue(i), getContext(i));
		if (requirement) {
			requirements.push(requirement);
		}
		i = i + 1;
	} while (i < length && requirement !== null);

	return requirements;
}

/**
 * Don't use ${value} inside message when value is invalid
 * @param options
 */
export function createValidator<ValidValue = any>(options: CreateValidatorOptions): Validator<ValidValue> {
	function validate(value: any, ctx?: ValidationContext) {
		const context: ValidationContext = ctx || {
			value,
			path: [],
			rootValue: value,
			// generateError: errorOptions => ({
			// 	path: errorOptions.path,
			// 	message:
			// 		errorOptions.message.startsWith('[') && errorOptions.message.endsWith(']')
			// 			? errorOptions.message
			// 			: `[${errorOptions.message}]`,
			// 	value: errorOptions.value,
			// 	errors: errorOptions.errors || [],
			// }),
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
		// generateError: errorOptions => ctx.generateError(errorOptions),
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

export function groupErrors(error: Requirement | null): GroupedValidationError | null {
	if (!error) {
		return null;
	}

	const groupedError: GroupedValidationError = {
		path: '',
		errors: [],
		children: null,
	};

	// groupedRequirement is mutable here
	function handle(groupedRequirement: GroupedValidationError, requirement: Requirement) {
		groupedRequirement.errors.push(requirement.message);

		switch (requirement.type) {
			case 'single':
				break;
			case 'dependence':
				handle(groupedRequirement, requirement.requirement);
				break;
			case 'alternative':
			case 'concatenation':
				requirement.requirements.forEach(err => {
					if (err.path.length === requirement.path.length) {
						// paths should be the same here
						// it means this `err` is related to `error`
						handle(groupedRequirement, err);
					} else if (err.path.length > requirement.path.length) {
						const childPath = err.path[err.path.length - 1];

						const childGroupedError = {
							path: childPath,
							errors: [],
							children: null,
						};

						handle(childGroupedError, err);

						groupedRequirement.children = groupedRequirement.children || [];
						groupedRequirement.children.push(childGroupedError);
					}
				});
				break;
		}
	}

	handle(groupedError, error);

	return groupedError;
}
