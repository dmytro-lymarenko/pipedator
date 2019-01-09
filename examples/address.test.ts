import { shape, string, number, values, empty, ternary, optional } from '../src';

/*
This example dedonstrates how to build address validator with the next requirements:
  - it must be an object with a set of properties (email, country, ip)
  - at least one field is required
*/

function addressValidator() {
	const model = {
		email: string(),
		country: string(),
		ip: number(),
	};

	return ternary(values(empty()), shape(model), shape(model, { wrapValidators: optional }));
}

describe('Address test', () => {
	it('should work', () => {
		// Should show errors for each field
		expect(addressValidator().validate({})).toMatchSnapshot();
		// Should show errors for each field
		expect(addressValidator().validate({ email: null, country: null, ip: null })).toMatchSnapshot();
		// should be valid
		expect(addressValidator().validate({ country: 'USA' })).toMatchSnapshot();
		// should fail and show one error: country is invalid
		expect(addressValidator().validate({ country: 1 })).toMatchSnapshot();
		// should fail and show two errors: country and ip are invalid
		expect(addressValidator().validate({ country: 1, ip: 'wrong ip' })).toMatchSnapshot();
	});
});
