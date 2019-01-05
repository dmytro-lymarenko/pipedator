import { createValidator, findFirstRequirement, Validator } from '../core';
import { singleRequirementFactory, concatenationRequirementFactory, Requirement, isRequirement } from '../core/requirements';

export interface AbstractShapeOptions {
	onlyFirstRequirement?: boolean;
	// wraps each validator provided in a shape
	wrapValidators?: (validator: Validator) => Validator;
	openedBracket?: string;
	closedBracket?: string;
}

export function abstractShape<Key, ValidValue = any>(
	keys: Key[],
	shape: (key: Key) => Validator,
	options?: AbstractShapeOptions,
	message?: string
): Validator {
	return createValidator<ValidValue>({
		validate: (value, ctx) => {
			if (value === undefined || value === null) {
				return singleRequirementFactory('Value should be defined')(ctx.path, value);
			}

			let requirements: Requirement[] = [];

			const onlyFirstRequirement = Boolean(options && options.onlyFirstRequirement);
			const wrapValidators = (options && options.wrapValidators) || null;

			function getValidatorAtKey(key: Key): Validator {
				return wrapValidators ? wrapValidators(shape(key)) : shape(key);
			}

			if (onlyFirstRequirement) {
				const { requirement } = findFirstRequirement(
					i => getValidatorAtKey(keys[i]),
					i => value[keys[i]],
					i => ({
						...ctx,
						path: [...ctx.path, keys[i].toString()],
					}),
					keys.length
				);

				if (requirement) {
					requirements = [requirement];
				}
			} else {
				requirements = keys
					.map(key =>
						getValidatorAtKey(key).validate(value[key], {
							...ctx,
							path: [...ctx.path, key.toString()],
						})
					)
					.filter(isRequirement);
			}

			if (requirements.length > 0) {
				return concatenationRequirementFactory(message || 'Value should have a valid shape', requirements)(ctx.path, value);
			}

			return null;
		},
	});
}
