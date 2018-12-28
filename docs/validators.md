<!--- This file is generated automatically by `scripts/buildDocs.ts`. Please, don't change it. --->
# Validators

- [`abstractShape`](#abstractshape)
- [`alt`](#alt)
- [`alternative`](#alternative)
- [`both`](#both)
- [`either`](#either)
- [`empty`](#empty)
- [`equalTo`](#equalto)
- [`every`](#every)
- [`failure`](#failure)
- [`greater`](#greater)
- [`ignore`](#ignore)
- [`keys`](#keys)
- [`match`](#match)
- [`nullable`](#nullable)
- [`optional`](#optional)
- [`pipe`](#pipe)
- [`shape`](#shape)
- [`some`](#some)
- [`string`](#string)
- [`success`](#success)
- [`ternary`](#ternary)
- [`test`](#test)
- [`tuple`](#tuple)
- [`valid`](#valid)
- [`values`](#values)
- [`valuesByKeys`](#valuesbykeys)
- [`when`](#when)

## `abstractShape`

- **Description**

Creates a validator for specified shape.

- **How to import**

```typescript
import { abstractShape } from 'pipedator';
// or
import { abstractShape } from 'pipedator/lib/abstractShape';

```
- **Signature**

```typescript
function abstractShape<Key>(
	keys: Key[],
	shape: (key: Key) => Validator,
	options?: AbstractShapeOptions,
	message?: string
): Validator;
```
- **Parameters**

  - `keys` - an array of keys. Usually they are numbers or strings.
  - `shape` - a function which returns a validator at `key` position in the `shape`.
  - `options` - (optional) options:
    - `.onlyFirstError` - (optional) indicates whether to return all errors or only the first one.
  - `message` - (optional) allows to set custom message when error occurs

- **Interfaces**

```typescript
interface AbstractShapeOptions {
	onlyFirstError?: boolean;
}
```

- **Usage**

To create a validator with the next shape:
```typescript
{
	foo: string;
	bar: number;
}
```
You can write:
```typescript
const shape: { [key: string]: Validator } = {
	foo: string(), // string validator
	bar: number(), // number validator
};

const fooBarShapeValidator = abstractShape(
	['foo', 'bar'],
	// As abstractShape is some kind of abstraction we can write here everything we need.
	// Here, in the example, we just take validators from created above object.
	// Key in the bellow function is one of the provided keys as the first argument to abstractShape function.
	key => shape[key]
);
```
and then validate a value:
```typescript
fooBarShapeValidator.validate({ foo: 'foo', bar: 5 }); // valid
fooBarShapeValidator.validate({ foo: 'foo', bar: 5, another: 'string' }); // also valid
fooBarShapeValidator.validate({ foo: 'foo', bar: '5' }); // invalid
```


## `alt`

```typescript
import { alt } from 'pipedator';
// or
import { alt } from 'pipedator/lib/alt';

```
An alias for [`alternative`](#alternative)


## `alternative`

```typescript
import { alternative } from 'pipedator';
// or
import { alternative } from 'pipedator/lib/alternative';

```
Creates new validator which succeedes when at least one validator from `validators` does.
- `validators` - an array of [Validator](#validator).
- `message` - an optional string which can be used to overwrite error message.
```typescript
const numberOrString = alternative([string(), number()]);
// numberOrString will succeed when provided value is either string or number:
numberOrString.validate(4) // valid
numberOrString.validate('text') // valid
numberOrString.validate({}) // invalid
```


## `both`

```typescript
import { both } from 'pipedator';
// or
import { both } from 'pipedator/lib/both';

```
An alias for [`pipe`](#pipe)


## `either`

```typescript
import { either } from 'pipedator';
// or
import { either } from 'pipedator/lib/either';

```
An alias for [`alternative`](#alternative)


## `empty`

```typescript
import { empty } from 'pipedator';
// or
import { empty } from 'pipedator/lib/empty';

```
Creates new validator which succeedes when value is empty.

*Notes*:
- Value is empty when `value.length === 0`
- This validator requires value to be defined:

```typescript
const validator = empty();

validator.validate(''); // valid
validator.validate('not empty string'); // invalid
validator.validate([]); // valid
validator.validate([1]); // invalid
validator.validate({ length: 0 }); // valid
validator.validate(null); // throws an error (trying to read property length from null)
validator.validate(undefined); // throws an error (trying to read property length from undefined)

```


## `equalTo`

Not yet documented


## `every`

Not yet documented


## `failure`

Not yet documented


## `greater`

Not yet documented


## `ignore`

```typescript
import { ignore } from 'pipedator';
// or
import { ignore } from 'pipedator/lib/ignore';

```
An alias for [`success`](#success)

- **Usage**

for example, in tuple we can write like this:

```typescript
tuple([number(), ignore(), string()]);
```


## `keys`

Not yet documented


## `match`

- **Description**

Creates a validator for matching a string against provided regexp.

- **How to import**

```typescript
import { match } from 'pipedator';
// or
import { match } from 'pipedator/lib/match';

```
- **Signature**

```typescript
function match(regexp: RegExp, message?: string): Validator;
```
- **Parameters**

  - `regexp` - provided regexp to test a string (value).
  - `message` - (optional) custom message.


- **Usage**

```typescript
match(/test/).validate('Some test have passed'); // valid
match(/test/).validate('Some text have be read'); // invalid
```


## `nullable`

Not yet documented


## `optional`

- **Description**

Creates a validator which allows a value to be undefined.

- **How to import**

```typescript
import { optional } from 'pipedator';
// or
import { optional } from 'pipedator/lib/optional';

```
- **Signature**

```typescript
function optional(validator: Validator, message?: string): Validator;
```
- **Parameters**

  - `validator` - some valildator to validate a value.
  - `message` - (optional) custom message.


- **Usage**

```typescript
const optionalNumber = optional(number());
optionalNumber.validate(4); // valid
optionalNumber.validate(undefined); // valid
optionalNumber.validate(null); // invalid
```


## `pipe`

Not yet documented


## `shape`

Not yet documented


## `some`

- **Description**

Creates a validator which works like `.some()` method from an array:
it will fail when all values fail and it will succed when at least
one value from the array succeds. **This validator requires a value to be an array**.

- **How to import**

```typescript
import { some } from 'pipedator';
// or
import { some } from 'pipedator/lib/some';

```
- **Signature**

```typescript
function some(validator: Validator, message?: string): Validator;
```
- **Parameters**

  - `validator` - a validator which is executed for each value.
  - `message` - (optional) custom message


- **Usage**

```typescript
some(string()).validate(['test', 5]); // valid
some(string()).validate([null, 'test']); // valid
some(string()).validate([]]); // valid
some(string()).validate([{}, 5]); // invalid because there is no at least one string
some(string(), 'Custom message').validate([{}, 5]); // invalid with 'Custom message'
some(string()).validate(5); // throws an error. Value should be an ARRAY!
```


## `string`

- **Description**

Creates a validator to check if a value is a string or not.

- **How to import**

```typescript
import { string } from 'pipedator';
// or
import { string } from 'pipedator/lib/string';

```
- **Signature**

```typescript
function string(message?: string): Validator;
```
- **Parameters**

  - `message` - (optional) custom message.


- **Usage**

```typescript
string().validate('Some text'); // valid
string().validate(5); // invalid
string('Custom message').validate(null); // invalid with 'Custom message'
```


## `success`

Not yet documented


## `ternary`

Not yet documented


## `test`

Not yet documented


## `tuple`

Not yet documented


## `valid`

Not yet documented


## `values`

Not yet documented


## `valuesByKeys`

Not yet documented


## `when`

Not yet documented


