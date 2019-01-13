import { uniq } from './index';

describe('uniq()', () => {
	it('should validate when value is uniq', () => {
		expect(uniq().validate([1, 2, 3])).toBeNull();
	});

	it('should validate with custom comparator', () => {
		expect(uniq((a, b) => a.x === b.x).validate([{ x: 1 }, { x: 2 }, { x: 3 }])).toBeNull();
	});

	it('should validate when there is one or 0 items in any direction', () => {
		expect(uniq().validate([])).toBeNull();
		expect(uniq().validate([1])).toBeNull();
	});

	it('should fail when array is not uniq', () => {
		expect(uniq().validate([1, 2, 4, 2])).toMatchSnapshot();
		expect(uniq().validate([1, 1, 1, 5, 4])).toMatchSnapshot();
		expect(uniq().validate([1, 2, 3, 5, 4, 6, 7, 1])).toMatchSnapshot();
	});

	it('should fail when array is not uniq with custom comparator', () => {
		expect(uniq((a, b) => a.x === b.x).validate([{ x: 2 }, { x: 2 }, { x: 3 }])).toMatchSnapshot();
	});

	it('should support custom message as first arg', () => {
		expect(uniq('Custom message').validate([5, 1, 3, 1, 2])).toMatchSnapshot();
	});

	it('should support both custom comparator and custom message', () => {
		expect(uniq((a, b) => a.x === b.x, 'Custom message').validate([{ x: 2 }, { x: 2 }, { x: 3 }])).toMatchSnapshot();
	});
});
