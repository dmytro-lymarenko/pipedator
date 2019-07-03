import { shape, pipe, string, greater, less, match, alt, number, optional } from '../src';

/*
const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    access_token: [Joi.string(), Joi.number()],
    birthyear: Joi.number().integer().min(1900).max(2013),
    email: Joi.string().email({ minDomainSegments: 2 })
}).with('username', 'birthyear').without('password', 'access_token');
*/

const schema = shape({
	username: pipe(
		string(),
		greater(3),
		less(30)
	),
	password: optional(
		pipe(
			string(),
			match(/^[a-zA-Z0-9]{3,30}$/)
		)
	),
	access_token: optional(alt(string(), number())),
	birthyear: optional(
		pipe(
			number(),
			greater(1900),
			less(2013)
		)
	),
	email: optional(string()),
});

describe('Register form test', () => {
	it('should pass the validation', () => {
		expect(
			schema.validate({
				username: 'John',
			})
		).toMatchSnapshot();
	});
});
