export interface BaseRequirement {
	value: any;
	path: string[];
	message: string;
}

export interface RequirementFactory<R extends Requirement = Requirement> {
	(path: string[], value: any): R;
}

export type Requirement = SingleRequirement | DependenceRequirement | AlternativeRequirement | ConcatenationRequirement;

export interface SingleRequirement extends BaseRequirement {
	type: 'single';
}

export interface DependenceRequirement extends BaseRequirement {
	type: 'dependence';
	requirement: Requirement;
}

export interface AlternativeRequirement extends BaseRequirement {
	type: 'alternative';
	requirements: Requirement[];
}

export interface ConcatenationRequirement extends BaseRequirement {
	type: 'concatenation';
	requirements: Requirement[];
}

export function isRequirement(requirement: Requirement | null): requirement is Requirement {
	return requirement !== null;
}

// Factories

export function singleRequirementFactory(message: string): RequirementFactory<SingleRequirement> {
	return (path, value) => ({
		path,
		value,
		message,
		type: 'single',
	});
}

export function dependenceRequirementFactory(
	message: string,
	requirement: Requirement
): RequirementFactory<DependenceRequirement> {
	return (path, value) => ({
		path,
		value,
		requirement,
		message,
		type: 'dependence',
	});
}

export function alternativeRequirementFactory(
	message: string,
	requirements: Requirement[]
): RequirementFactory<AlternativeRequirement | DependenceRequirement> {
	if (requirements.length < 1) {
		throw new Error('There must be 1 or more requirements');
	}

	if (requirements.length === 1) {
		return dependenceRequirementFactory(message, requirements[0]);
	}

	return (path, value) => ({
		path,
		value,
		message,
		type: 'alternative',
		requirements: requirements.reduce(
			(res, requirement) =>
				// (a || (b || (c && d)) || e) === (a || b || (c && d) || e)
				requirement.type === 'alternative' ? [...res, ...requirement.requirements] : [...res, requirement],
			[] as Requirement[]
		),
	});
}

export function concatenationRequirementFactory(
	message: string,
	requirements: Requirement[]
): RequirementFactory<ConcatenationRequirement | DependenceRequirement> {
	if (requirements.length < 1) {
		throw new Error('There must be 1 or more requirements');
	}

	if (requirements.length === 1) {
		return dependenceRequirementFactory(message, requirements[0]);
	}

	return (path, value) => ({
		path,
		value,
		message,
		type: 'concatenation',
		requirements: requirements.reduce(
			(res, requirement) =>
				// (a && (b && (c || d)) && e) === (a && b && (c || d) && e)
				requirement.type === 'concatenation' ? [...res, ...requirement.requirements] : [...res, requirement],
			[] as Requirement[]
		),
	});
}

// examples:
// const numberRequirementFactory = singleRequirementFactory('Value should be a number');

// function equalToRequirementFactory(validValue: any): RequirementFactory<SingleRequirement> {
// 	return singleRequirementFactory(`Value should equal to ${validValue}`);
// }

// function optionalRequirementFactory(requirement: Requirement): RequirementFactory<AlternativeRequirement> {
// 	const undefinedFactory = equalToRequirementFactory(undefined);

// 	return (path, value) => alternativeRequirementFactory('', [undefinedFactory(path, value), requirement])(path, value);
// }

// const optionalNumberRequirementFactory: RequirementFactory<AlternativeRequirement> = (path, value) =>
// 	optionalRequirementFactory(numberRequirementFactory(path, value))(path, value);

// function someRequirementFactory(requirement: Requirement): RequirementFactory<DependenceRequirement> {
// 	return dependenceRequirementFactory('Some item should follow the requirement', requirement);
// }
