- **Description**

Creates a validator which succeeds when `condition` and `success` do or when `condition` fails and `failure` succeeds;
otherwise the validator fails (when `condition` succeeds but `success` fails or when both `condition` and `failure` fail).

- **How to import**

```typescript
import { ternary } from 'pipedator';
// or
import { ternary } from 'pipedator/lib/ternary';

```
- **Signature**

```typescript
function ternary(condition: Validator, success: Validator, failure: Validator): Validator;
```
- **Parameters**

  - `condition` - a validator, which is executed first. When it succeeds then `success` validator is executed otherwise `failure`.
  - `success` - a validator to test `value` when `condition` succeeds.
  - `failure` - a validator to test `value` when `condition` fails.

- **Usage**

```typescript
import { ternary, number, string, greater, match, both } from 'pipedator';

/*
	Lets create a validator which test a value in the next way:
		- when a value is a number then it should be greater than 5;
		- otherwise it should be a string and match /test/ regexp.
*/
const validator = ternary(
	// condition
	number(),
	// when value is a number then
	greater(5),
	// otherwise
	both([
		string(),
		match(/test/)
	])
);

validator.validate(6); // valid
validator.validate('The test'); // valid
validator.validate(3); // invalid
validator.validate('text'); // invalid
validator.validate(null); // invalid
```