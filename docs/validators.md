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
- [`less`](#less)
- [`match`](#match)
- [`nullable`](#nullable)
- [`number`](#number)
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

- **Description**

An alias for [`alternative`](#alternative)

- **How to import**

```typescript
import { alt } from 'pipedator';
// or
import { alt } from 'pipedator/lib/alt';
```



## `alternative`

- **Description**

Creates a validator which succeedes when at least one validator from `validators` does.

- **How to import**

```typescript
import { alternative } from 'pipedator';
// or
import { alternative } from 'pipedator/lib/alternative';

```
- **Signature**

```typescript
function alternative(validators: Validator[], message?: string): Validator;
```
- **Parameters**

  - `validators` - an array of validators to test a value.
  - `message` - (optional) custom message.

- **Usage**

```typescript
const numberOrString = alternative([string(), number()]);
// numberOrString will succeed when provided value is either string or number:
numberOrString.validate(4) // valid
numberOrString.validate('text') // valid
numberOrString.validate({}) // invalid
```


## `both`

- **Description**

An alias for [`pipe`](#pipe)

- **How to import**

```typescript
import { both } from 'pipedator';
// or
import { both } from 'pipedator/lib/both';
```



## `either`

- **Description**

An alias for [`alternative`](#alternative)

- **How to import**

```typescript
import { either } from 'pipedator';
// or
import { either } from 'pipedator/lib/either';
```



## `empty`

- **Description**

Creates a validator which succeedes when value is empty.

- *Notes*:
  - Value is empty when `value.length === 0`
  - This validator requires value to be defined:

- **How to import**

```typescript
import { empty } from 'pipedator';
// or
import { empty } from 'pipedator/lib/empty';

```
- **Signature**

```typescript
function empty(message?: string): Validator;
```
- **Parameters**
  - `message` - (optional) custom message.


- **Usage**

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

- **Description**

Creates a validator which checks if a value is strictly(===) equal to the provided `validValue`.

- **How to import**

```typescript
import { equalTo } from 'pipedator';
// or
import { equalTo } from 'pipedator/lib/equalTo';

```
- **Signature**

```typescript
function equalTo(validValue: any | ValidationRef, message?: string): Validator;
```
- **Parameters**

  - `validValue` - any value the tested value should be equal to or the reference to the part of complex value (like object).
  - `message` - (optional) custom message


- **Usage**

```typescript
equalTo('test').validate('test'); // valid
equalTo('test').validate('text'); // invalid
equalTo('test', 'Custom message').validate('text'); // invalid with 'Custom message'

import { shape, ref, string } from 'pipedator';

const validator = shape({ a: string(), b: equalTo(ref(['a'])) });

validator.validate({ a: 'test', b: 'test' }); // valid
validator.validate({ a: 'test', b: 'text' }); // invalid because value.b !== value.a
```


## `every`

- **Description**

Creates a validator which works like `.every()` method from an array:
it will fail when at least one value fails and it will succeed when all values do. **This validator requires a value to be an array**.

- **How to import**

```typescript
import { every } from 'pipedator';
// or
import { every } from 'pipedator/lib/every';

```
- **Signature**

```typescript
function every(validator: Validator, message?: string): Validator;
```
- **Parameters**

  - `validator` - a validator which is executed for each value.
  - `message` - (optional) custom message


- **Usage**

```typescript
every(string()).validate(['test']); // valid
every(string()).validate(['test', 'another']); // valid
every(string()).validate([]]); // valid
every(string()).validate(['text', 5]); // invalid because at least one value is not a string
every(string(), 'Custom message').validate([{}, 5]); // invalid with 'Custom message'
every(string()).validate(5); // throws an error. Value should be an ARRAY!
```


## `failure`

- **Description**

Creates a validator which always fails (the opposite to [`success`](#success)).

- **How to import**

```typescript
import { failure } from 'pipedator';
// or
import { failure } from 'pipedator/lib/failure';

```
- **Signature**

```typescript
function failure(message?: string): Validator;
```
- **Parameters**

  - `message` - (optional) custom message.


- **Usage**

```typescript
failure().validate(1 /* or any other value */); // invalid
failure('Custom message').validate(1 /* or any other value */); // invalid with 'Custom message'
```


## `greater`

- **Description**

Creates a validator which checks if a value is greater than the provided `limit`.

- **How to import**

```typescript
import { greater } from 'pipedator';
// or
import { greater } from 'pipedator/lib/greater';

```
- **Signature**

```typescript
function greater(limit: number | ValidationRef, message?: string): Validator;
```
- **Parameters**

  - `limit` - any number the tested value should be greater than or the reference to the part of complex value (like object).
  - `message` - (optional) custom message


- **Usage**

```typescript
greater(1).validate(5); // valid
greater(5).validate(1); // invalid
greater(5).validate(5); // invalid because 5 < 5 returns false
greater(5, 'Custom message').validate(1); // invalid with 'Custom message'

import { shape, ref, number } from 'pipedator';

const validator = shape({ a: number(), b: greater(ref(['a'])) });

validator.validate({ a: 1, b: 5 }); // valid
validator.validate({ a: 5, b: 1 }); // invalid because value.b < value.a
```


## `ignore`

- **Description**

An alias for [`success`](#success)

- **How to import**

```typescript
import { ignore } from 'pipedator';
// or
import { ignore } from 'pipedator/lib/ignore';
```

- **Usage**

for example, in tuple we can write like this:

```typescript
tuple([number(), ignore(), string()]);
```


## `keys`

- **Description**

Creates a validator which takes all keys from value using `Object.keys` function and uses provided `validator` to validate it.
**Make sure provided validator works with an array as value** (like [`some`](#some), [`every`](#every) etc).

- **How to import**

```typescript
import { keys } from 'pipedator';
// or
import { keys } from 'pipedator/lib/keys';

```
- **Signature**

```typescript
function keys(validator: Validator, message?: string): Validator;
```
- **Parameters**

  - `validator` - a validator to validate keys.
  - `message` - (optional) custom message.

- **Usage**

```typescript
import { match, every } from 'pipedator';

keys(every(match(/^test/))).validate({ testA: 5, testB: 'text' }); // valid
keys(every(match(/^test/))).validate({ testA: 5, b: 'text' }); // invalid
keys(every(match(/^test/)), 'Custom message').validate({ testA: 5, b: 'text' }); // invalid with 'Custom message'
```


## `less`

- **Description**

Creates a validator which checks if a value is less than the provided `limit`.

- **How to import**

```typescript
import { less } from 'pipedator';
// or
import { less } from 'pipedator/lib/less';

```
- **Signature**

```typescript
function less(limit: number | ValidationRef, message?: string): Validator;
```
- **Parameters**

  - `limit` - any number the tested value should be less than or the reference to the part of complex value (like object).
  - `message` - (optional) custom message


- **Usage**

```typescript
less(5).validate(1); // valid
less(1).validate(5); // invalid
less(5).validate(5); // invalid because 5 > 5 returns false
less(1, 'Custom message').validate(5); // invalid with 'Custom message'

import { shape, ref, number } from 'pipedator';

const validator = shape({ a: number(), b: less(ref(['a'])) });

validator.validate({ a: 5, b: 1 }); // valid
validator.validate({ a: 1, b: 5 }); // invalid because value.b > value.a
```


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

- **Description**

Creates a validator which allows a value to be null in addition to the provided validator.

- **How to import**

```typescript
import { nullable } from 'pipedator';
// or
import { nullable } from 'pipedator/lib/nullable';

```
- **Signature**

```typescript
function nullable(validator: Validator, message?: string): Validator;
```
- **Parameters**

  - `validator` - some valildator to validate a value.
  - `message` - (optional) custom message.


- **Usage**

```typescript
const optionalNumber = nullable(number());
optionalNumber.validate(4); // valid
optionalNumber.validate(null); // valid
optionalNumber.validate(undefined); // invalid
```


## `number`

- **Description**

Creates a validator to check if a value is a number or not.

- **How to import**

```typescript
import { number } from 'pipedator';
// or
import { number } from 'pipedator/lib/number';

```
- **Signature**

```typescript
function number(message?: string): Validator;
```
- **Parameters**

  - `message` - (optional) custom message.


- **Usage**

```typescript
number().validate(5); // valid
number().validate(NaN); // valid
number().validate('Some text'); // invalid
number('Custom message').validate(null); // invalid with 'Custom message'
```


## `optional`

- **Description**

Creates a validator which allows a value to be undefined in addition to the provided validator.

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
it will fail when all values fail and it will succeed when at least
one value from the array succeeds. **This validator requires a value to be an array**.

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

- **Description**

Creates a validator which always fails (the opposite to [`failure`](#failure)).

- **How to import**

```typescript
import { success } from 'pipedator';
// or
import { success } from 'pipedator/lib/success';

```
- **Signature**

```typescript
function success(): Validator;
```

- **Usage**

```typescript
success().validate(1 /* or any other value */); // valid
```


## `ternary`

Not yet documented


## `test`

- **Description**

Creates a validator which succeeds when provided predicate returns true and fails otherwise.

- **How to import**

```typescript
import { test } from 'pipedator';
// or
import { test } from 'pipedator/lib/test';

```
- **Signature**

```typescript
function test(isValid: (value: any) => boolean, message: string): Validator;
```
- **Parameters**

  - `isValid` - a predicate which indicates whether value is valid or not.
  - `message` - custom message.

- **Usage**

```typescript
test(value => value === 1, 'Value is not equal to 1').validate(1); // valid
test(value => value === 1, 'Value is not equal to 1').validate(2); // invalid
```


## `tuple`

Not yet documented


## `valid`

- **Description**

An alias for [`equalTo`](#equalto)

- **How to import**

```typescript
import { valid } from 'pipedator';
// or
import { valid } from 'pipedator/lib/valid';
```



## `values`

- **Description**

The same as [`valuesByKeys`](#valuesbykeys) except it already provides all `keys` from value using `Object.keys` method.

- **How to import**

```typescript
import { values } from 'pipedator';
// or
import { values } from 'pipedator/lib/values';

```
- **Signature**

```typescript
function values(validator: Validator, message?: string): Validator;
```
- **Parameters**

  - `validator` - a validator to validate values.
  - `message` - (optional) custom message.

- **Usage**

```typescript
import { match, every } from 'pipedator';

values(every(match(/^test/))).validate({ a: 'testA', b: 'testB' }); // valid
values(every(match(/^test/))).validate({ a: 'testA', b: 'testB', c: 5 }); // invalid
values(every(match(/^test/)), 'Custom message').validate({ a: 'testA', b: 5 }); // invalid with 'Custom message'
```


## `valuesByKeys`

- **Description**

Creates a validator which takes values by provided keys from value and uses provided `validator` to validate it.
**Make sure provided validator works with an array as value** (like [`some`](#some), [`every`](#every) etc).

- **How to import**

```typescript
import { valuesByKeys } from 'pipedator';
// or
import { valuesByKeys } from 'pipedator/lib/valuesByKeys';

```
- **Signature**

```typescript
function valuesByKeys(keys: string[], validator: Validator, message?: string): Validator;
```
- **Parameters**

  - `keys` - an array of strings representing keys to validate.
  - `validator` - a validator to validate values by provided keys.
  - `message` - (optional) custom message.

- **Usage**

```typescript
import { match, every } from 'pipedator';

valuesByKeys(['a', 'b'], every(match(/^test/))).validate({ a: 'testA', b: 'testB' }); // valid
valuesByKeys(['a', 'b'], every(match(/^test/))).validate({ a: 'testA', b: 'testB', c: 5 }); // valid because 'c' is not listed in keys
valuesByKeys(['a', 'b'], every(match(/^test/))).validate({ a: 'testA', b: 5 }); // invalid
valuesByKeys(['a', 'b'], every(match(/^test/)), 'Custom message').validate({ a: 'testA', b: 5 }); // invalid with 'Custom message'
```


## `when`

Not yet documented


