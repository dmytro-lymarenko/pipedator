import { number } from '../number';
import { shape } from '../shape';
import { string } from '../string';
import { some } from '../some';
import { tuple } from '../tuple';
import { alternative } from '../alternative';
import { greater } from '../greater';

describe('complex validators', () => {
	it('should work', () => {
		expect(
			some(
				shape({
					foo: string(),
				})
			).validate([null, { foo: 2 }])
		).toMatchSnapshot();

		expect(
			some(
				shape({
					foo: shape({
						bar: string(),
					}),
					valid: number(),
				})
			).validate([{ foo: 1, valid: 1 }])
		).toMatchSnapshot();

		expect(
			some(
				tuple([
					shape({
						bar: string(),
					}),
					number(),
				])
			).validate([1, 1])
		).toMatchSnapshot();

		expect(alternative(string(), alternative(number(), greater(5))).validate({})).toMatchSnapshot();

		expect(alternative(string(), number()).validate({})).toMatchSnapshot();
	});
});
