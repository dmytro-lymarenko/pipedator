import { sorted } from './index';

describe('sorted()', () => {
	it('should validate when value is sorted asc', () => {
		expect(sorted('asc').validate([1, 2, 3])).toBeNull();
		expect(sorted((a, b) => a - b).validate([1, 2, 3])).toBeNull();
	});

	it('should validate when value is sorted desc', () => {
		expect(sorted('desc').validate([3, 2, 1])).toBeNull();
		expect(sorted((a, b) => b - a).validate([3, 2, 1])).toBeNull();
	});

	it('should support comparator with complex items', () => {
		expect(sorted((a, b) => a.x - b.x).validate([{ x: 1 }, { x: 2 }, { x: 3 }])).toBeNull();
	});

	it('should validate when there is one or 0 items in any direction', () => {
		expect(sorted('asc').validate([1])).toBeNull();
		expect(sorted('desc').validate([1])).toBeNull();

		expect(sorted('asc').validate([])).toBeNull();
		expect(sorted('desc').validate([])).toBeNull();
	});

	it('should validate when all items are the same in any direction', () => {
		expect(sorted('asc').validate([1, 1, 1, 1])).toBeNull();
		expect(sorted('desc').validate([1, 1, 1, 1])).toBeNull();
	});

	it('should fail when array is not sorted asc', () => {
		expect(sorted('asc').validate([3, 1, 2, 4, 5])).toMatchSnapshot();
		expect(sorted('asc').validate([1, 2, 3, 5, 4])).toMatchSnapshot();
		expect(sorted('asc').validate([1, 2, 3, 5, 4, 6, 7, 8])).toMatchSnapshot();
	});

	it('should fail when array is not sorted desc', () => {
		expect(sorted('asc').validate([5, 4, 3, 1, 2])).toMatchSnapshot();
		expect(sorted('asc').validate([4, 5, 3, 2, 1])).toMatchSnapshot();
		expect(sorted('asc').validate([8, 7, 6, 4, 5, 3, 2, 1])).toMatchSnapshot();
	});

	it('should support custom message', () => {
		expect(sorted('asc', 'Custom message').validate([5, 4, 3, 1, 2])).toMatchSnapshot();
	});
});
