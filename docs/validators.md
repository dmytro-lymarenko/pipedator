<!--- This file is generated automatically by `scripts/buildDocs.ts`. Please, don't change it. --->
# Validators

- [`abstractShape`](#abstractshape)
- [`alt`](#alt)
- [`alternative`](#alternative)
- [`array`](#array)
- [`arrayOf`](#arrayof)
- [`both`](#both)
- [`defined`](#defined)
- [`either`](#either)
- [`empty`](#empty)
- [`equalTo`](#equalto)
- [`every`](#every)
- [`failure`](#failure)
- [`forbidden`](#forbidden)
- [`greater`](#greater)
- [`ignore`](#ignore)
- [`keys`](#keys)
- [`less`](#less)
- [`lowerCase`](#lowercase)
- [`match`](#match)
- [`negative`](#negative)
- [`nillable`](#nillable)
- [`nullable`](#nullable)
- [`number`](#number)
- [`oneOf`](#oneof)
- [`optional`](#optional)
- [`pipe`](#pipe)
- [`positive`](#positive)
- [`prop`](#prop)
- [`shape`](#shape)
- [`some`](#some)
- [`sorted`](#sorted)
- [`string`](#string)
- [`success`](#success)
- [`ternary`](#ternary)
- [`test`](#test)
- [`tuple`](#tuple)
- [`uniq`](#uniq)
- [`upperCase`](#uppercase)
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
function abstractShape<Key, ValidValue = any>(
	keys: Key[],
	shape: (key: Key) => Validator,
	options?: AbstractShapeOptions,
	message?: string
): Validator<ValidValue>;
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

Creates a validator which succeedes when at least one validator from `validators` does. The order of testing value is from left to right.
It means when we have provided `a` and `b` validators in `[a, b]` order then validator `a` will be executed first, then `b`.

- **How to import**

```typescript
import { alternative } from 'pipedator';
// or
import { alternative } from 'pipedator/lib/alternative';

```
- **Signature**

```typescript
function alternative<ValidValue = any>(validators: Validator[], message?: string): Validator<ValidValue>;
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


## `array`

- **Description**

Creates a validator to check if a value is an array or not.

- **How to import**

```typescript
import { array } from 'pipedator';
// or
import { array } from 'pipedator/lib/array';

```
- **Signature**

```typescript
function array<ValidValue = any>(message?: string): Validator<ValidValue>;
```
- **Parameters**

  - `message` - (optional) custom message.


- **Usage**

```typescript
array().validate([1, 2, 'string']); // valid
array().validate(5); // invalid
array('Custom message').validate(null); // invalid with 'Custom message'
```


## `arrayOf`

- **Description**

An alias for [`every`](#every)

- **How to import**

```typescript
import { arrayOf } from 'pipedator';
// or
import { arrayOf } from 'pipedator/lib/arrayOf';
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



## `defined`

- **Description**

Creates a validator to check if a value is defined (not null and not undefined).

- **How to import**

```typescript
import { defined } from 'pipedator';
// or
import { defined } from 'pipedator/lib/defined';

```
- **Signature**

```typescript
function defined<ValidValue = any>(message?: string): Validator<ValidValue>;
```
- **Parameters**

  - `message` - (optional) custom message.


- **Usage**

```typescript
defined().validate(''); // valid
defined().validate(0); // valid
defined().validate(undefined); // invalid
defined('Custom message').validate(null); // invalid with 'Custom message'
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
function empty<ValidValue = any>(message?: string): Validator<ValidValue>;
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
function equalTo<ValidValue = any>(validValue: any | ValidationRef, message?: string): Validator<ValidValue>;
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
function every<ValidValue = any>(validator: Validator, message?: string): Validator<ValidValue>;
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
function failure<ValidValue = any>(message?: string): Validator<ValidValue>;
```
- **Parameters**

  - `message` - (optional) custom message.


- **Usage**

```typescript
failure().validate(1 /* or any other value */); // invalid
failure('Custom message').validate(1 /* or any other value */); // invalid with 'Custom message'
```


## `forbidden`

- **Description**

Creates a validator which requires value to be undefined.

- **How to import**

```typescript
import { forbidden } from 'pipedator';
// or
import { forbidden } from 'pipedator/lib/forbidden';

```
- **Signature**

```typescript
function forbidden<ValidValue = any>(message?: string): Validator<ValidValue>;
```
- **Parameters**

  - `message` - (optional) custom message.


- **Usage**

```typescript
const forbiddenNumber = forbidden();
forbiddenNumber.validate(undefined); // valid
forbiddenNumber.validate(4); // invalid
forbiddenNumber.validate(null); // invalid
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
function greater<ValidValue = any>(limit: number | ValidationRef, message?: string): Validator<ValidValue>;
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
function keys<ValidValue = any>(validator: Validator, message?: string): Validator<ValidValue>;
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
function less<ValidValue = any>(limit: number | ValidationRef, message?: string): Validator<ValidValue>;
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


## `lowerCase`

- **Description**

Creates a validator which succeedes when value is in lowercase.

- *Notes*:
  - Value should be a string

- **How to import**

```typescript
import { lowerCase } from 'pipedator';
// or
import { lowerCase } from 'pipedator/lib/lowerCase';

```
- **Signature**

```typescript
function lowerCase<ValidValue = any>(message?: string): Validator<ValidValue>;
```
- **Parameters**
  - `message` - (optional) custom message.


- **Usage**

```typescript
lowerCase().validate(''); // valid
lowerCase().validate('test this string'); // valid
lowerCase().validate('test This string'); // invalid
lowerCase('Custom message').validate('test This string'); // invalid with 'Custom message'
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
function match<ValidValue = any>(regexp: RegExp, message?: string): Validator<ValidValue>;
```
- **Parameters**

  - `regexp` - provided regexp to test a string (value).
  - `message` - (optional) custom message.


- **Usage**

```typescript
match(/test/).validate('Some test have passed'); // valid
match(/test/).validate('Some text have be read'); // invalid
```


## `negative`

- **Description**

Creates a validator which succeedes when value is negative (0 is not negative for this validator).

- **How to import**

```typescript
import { negative } from 'pipedator';
// or
import { negative } from 'pipedator/lib/negative';

```
- **Signature**

```typescript
function negative<ValidValue = any>(message?: string): Validator<ValidValue>;
```
- **Parameters**
  - `message` - (optional) custom message.


- **Usage**

```typescript
negative().validate(-1); // valid
negative().validate(-10); // valid
negative().validate(0); // invalid
negative().validate(1); // invalid
```


## `nillable`

- **Description**

Creates a validator which allows a value to be null or undefined in addition to the provided validator.

- **How to import**

```typescript
import { nillable } from 'pipedator';
// or
import { nillable } from 'pipedator/lib/nillable';

```
- **Signature**

```typescript
function nillable<ValidValue = any>(validator: Validator, message?: string): Validator<ValidValue>;
```
- **Parameters**

  - `validator` - some valildator to validate a value.
  - `message` - (optional) custom message.


- **Usage**

```typescript
const nillableNumber = nillable(number());
nillableNumber.validate(4); // valid
nillableNumber.validate(null); // valid
nillableNumber.validate(undefined); // valid
nillableNumber.validate(''); // invalid, not a number
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
function nullable<ValidValue = any>(validator: Validator, message?: string): Validator<ValidValue>;
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
function number<ValidValue = any>(message?: string): Validator<ValidValue>;
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


## `oneOf`

- **Description**

Creates a validator which checks if a value is strictly(===) one of provided `allowedValues`.

- **How to import**

```typescript
import { oneOf } from 'pipedator';
// or
import { oneOf } from 'pipedator/lib/oneOf';

```
- **Signature**

```typescript
function oneOf<ValidValue = any>(allowedValues: (any | ValidationRef)[], message?: string): Validator<ValidValue>;
```
- **Parameters**

  - `allowedValues` - any values the tested value should be one of or the reference to the part of complex value (like object).
  - `message` - (optional) custom message


- **Usage**

```typescript
oneOf(['ts', 'js']).validate('ts'); // valid
oneOf(['ts', 'js']).validate('css'); // invalid
oneOf(['ts', 'js'], 'Custom message').validate('php'); // invalid with 'Custom message'

import { shape, ref, string } from 'pipedator';

const validator = shape({ a: string(), b: oneOf(['ts', ref(['a'])]) });

validator.validate({ a: 'js', b: 'ts' }); // valid
validator.validate({ a: 'js', b: 'js' }); // valid
validator.validate({ a: 'test', b: 'text' }); // invalid
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
function optional<ValidValue = any>(validator: Validator, message?: string): Validator<ValidValue>;
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

- **Description**

Creates a validator which succeedes when all provided validators do. The order of testing value is from left to right.
It means when we have provided `a` and `b` validators in `[a, b]` order then validator `a` will be executed first, then `b`.
Also it will stop execute the rest validators after failed one.

- **How to import**

```typescript
import { pipe } from 'pipedator';
// or
import { pipe } from 'pipedator/lib/pipe';

```
- **Signature**

```typescript
function pipe<ValidValue = any>(validators: Validator[], message?: string): Validator<ValidValue>;
```
- **Parameters**

  - `validators` - an array of validators to test a value.
  - `message` - (optional) custom message.

- **Usage**

```typescript
import { number, greater, pipe } from 'pipedator';

const numberAndGreaterThanFive = pipe([number(), greater(5)]);
// numberAndGreaterThanFive will succeed when provided value is number and is greater then 5:
numberAndGreaterThanFive.validate(6) // valid
numberAndGreaterThanFive.validate(3) // invalid, less than 5
numberAndGreaterThanFive.validate({}) // invalid, is not a number
```


## `positive`

- **Description**

Creates a validator which succeedes when value is positive (0 is not positive for this validator).

- **How to import**

```typescript
import { positive } from 'pipedator';
// or
import { positive } from 'pipedator/lib/positive';

```
- **Signature**

```typescript
function positive<ValidValue = any>(message?: string): Validator<ValidValue>;
```
- **Parameters**
  - `message` - (optional) custom message.


- **Usage**

```typescript
positive().validate(1); // valid
positive().validate(10); // valid
positive().validate(0); // invalid
positive().validate(-1); // invalid
```


## `prop`

- **Description**

Creates a validator to apply passed validator on the property of the value.

- **How to import**

```typescript
import { prop } from 'pipedator';
// or
import { prop } from 'pipedator/lib/prop';
```

- **Signature**

```typescript
function prop<ValidValue = any>(propName: string, validator: Validator<ValidValue>): Validator<ValidValue>;
```

- **Parameters**

  - `propName` - the property name to get value to test.
  - `validator` - validator to apply for property value.

* **Usage**

```typescript
prop('length', equalTo(3)).validate([1, 2, 'string']); // valid
prop('a', prop('b', string())).validate({ a: { b: 'some string' } }); // valid
prop('length', number()).validate(5); // invalid
```



## `shape`

- **Description**

Creates a validator to test a value to have provided shape.

- **How to import**

```typescript
import { shape } from 'pipedator';
// or
import { shape } from 'pipedator/lib/shape';

```
- **Signature**

```typescript
function shape<ValidValue = any>(shape: { [key: string]: Validator }, options?: AbstractShapeOptions, message?: string): Validator<ValidValue>;
```
- **Parameters**

  - `shape` - an object in which each key is a validator to test the respective sub value from `value` by that key.
  - `options` - (optional) options (see [`abstractShape`](#abstractshape) for more details)
  - `message` - (optional) custom message.

- **Usage**

```typescript
import { number, string, shape } from 'pipedator';

shape({ a: number(), b: string() }).validate({ a: 1, b: 'text' }); // valid
shape({ a: number(), b: string() }).validate({ a: 1, b: 'text', c: {} }); // valid
shape({ a: number(), b: string() }).validate({ a: '1', b: 'text' }); // invalid, value.a is not a number
shape({ a: number(), b: string() }).validate({ a: 1 }); // invalid, value.b is not a string
shape({ a: number(), b: string() }, { onlyFirstError: true }).validate({ a: '1' }); // invalid, returns only one error
shape({ a: number(), b: string() }, undefined, 'Custom message').validate({ a: 1 }); // invalid with 'Custom message'
```


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
function some<ValidValue = any>(validator: Validator, message?: string): Validator<ValidValue>;
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


## `sorted`

- **Description**

Creates a validator which checks if a value (array) is sorted in the right order.

- **How to import**

```typescript
import { sorted } from 'pipedator';
// or
import { sorted } from 'pipedator/lib/sorted';

```
- **Signature**

```typescript
function sorted<ValidValue = any>(direction: SortedDirection | SortedComparator, message?: string): Validator<ValidValue>;
```
where
```typescript
type SortedDirection = 'asc' | 'desc';
// 'asc' is equal to ((a, b) => a - b) and 'desc' is equal to ((a, b) => b - a)

interface SortedComparator {
	(a: any, b: any): number; // should return negative value when a < b
}
```
- **Parameters**

  - `direction` - either a string ('asc' or 'desc') or a comparator which identifies the order the array should be sorted.
  - `message` - (optional) custom message


- **Usage**

```typescript
sorted('asc').validate([]); // valid as well as for 'desc'
sorted('asc').validate([1]); // valid as well as for 'desc'
sorted('asc').validate([1, 2, 3]); // valid
sorted('desc').validate([3, 2, 1]); // valid
// custom comparator
sorted((a, b) => a.x - b.x).validate([{ x: 1 }, { x: 2 }, { x: 3 }]); // valid
sorted('asc').validate([1, 2, 3, 5, 4, 6, 7, 8]); // invalid
sorted('desc').validate([4, 5, 3, 2, 1]); // invalid
sorted('asc', 'Custom message').validate([1, 2, 4, 3]); // invalid with 'Custom message'
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
function string<ValidValue = any>(message?: string): Validator<ValidValue>;
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
function success<ValidValue = any>(): Validator<ValidValue>;
```

- **Usage**

```typescript
success().validate(1 /* or any other value */); // valid
```


## `ternary`

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
function ternary<ValidValue = any>(condition: Validator, success: Validator, failure: Validator): Validator<ValidValue>;
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
function test<ValidValue = any>(isValid: (value: any) => boolean, message: string): Validator<ValidValue>;
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

- **Description**

Creates a validator to test a value to have provided tuple. **This validator requires a value to be an array**.

- **How to import**

```typescript
import { tuple } from 'pipedator';
// or
import { tuple } from 'pipedator/lib/tuple';

```
- **Signature**

```typescript
function tuple<ValidValue = any>(tuple: Validator[], options?: AbstractShapeOptions, message?: string): Validator<ValidValue>;
```
- **Parameters**

  - `tuple` - an array in which each element is a validator to test the respective sub value from `value` by its index.
  - `options` - (optional) options (see [`abstractShape`](#abstractshape) for more details)
  - `message` - (optional) custom message.

- **Usage**

```typescript
import { number, string, tuple } from 'pipedator';

tuple([number(), string()]).validate([1, 'text']); // valid
tuple([number(), string()]).validate([1, 'text', {}]); // valid
tuple([number(), string()]).validate(['1', 'text']); // invalid, value.a is not a number
tuple([number(), string()]).validate([1]); // invalid, value.b is not a string
tuple([number(), string()], { onlyFirstError: true }).validate(['1']); // invalid, returns only one error
tuple([number(), string()], undefined, 'Custom message').validate([1]); // invalid with 'Custom message'

// to test, for example, the second element and when we don't care about the first one we can ignore it:
import { ignore } from 'pipedator';

tuple([ignore(), number()]).validate([null /* or any other value */, 5]); // valid
```


## `uniq`

- **Description**

Creates a validator which checks if a value (array) contains only uniq items.

- **How to import**

```typescript
import { uniq } from 'pipedator';
// or
import { uniq } from 'pipedator/lib/uniq';

```
- **Signature**

```typescript
function uniq<ValidValue = any>(): Validator<ValidValue>;
function uniq<ValidValue = any>(isEqual: IsEqual): Validator<ValidValue>;
function uniq<ValidValue = any>(message: string): Validator<ValidValue>;
function uniq<ValidValue = any>(isEqual: IsEqual, message: string): Validator<ValidValue>;
```
where
```typescript
interface IsEqual {
	(a: any, b: any): boolean;
}
```
- **Parameters**

  - `isEqual` - a comparator which identifies whether two items are equal or not. The default value is `(a, b) => a === b`
  - `message` - (optional) custom message


- **Usage**

```typescript
uniq().validate([]); // valid
uniq().validate([1]); // valid
uniq().validate([1, 2, 3]); // valid

// custom comparator
uniq((a, b) => a.x === b.x).validate([{ x: 1 }, { x: 2 }, { x: 3 }]); // valid
uniq().validate([1, 2, 4, 2]); // invalid
uniq('Custom message').validate([5, 1, 3, 1, 2]); // invalid with 'Custom message'
uniq((a, b) => a.x === b.x, 'Custom message').validate([{ x: 2 }, { x: 2 }, { x: 3 }]); // invalid with 'Custom message'
```


## `upperCase`

- **Description**

Creates a validator which succeedes when value is in uppercase.

- *Notes*:
  - Value should be a string

- **How to import**

```typescript
import { upperCase } from 'pipedator';
// or
import { upperCase } from 'pipedator/lib/upperCase';

```
- **Signature**

```typescript
function upperCase<ValidValue = any>(message?: string): Validator<ValidValue>;
```
- **Parameters**
  - `message` - (optional) custom message.


- **Usage**

```typescript
upperCase().validate(''); // valid
upperCase().validate('TEST THIS STRING'); // valid
upperCase().validate('TEST This STRING'); // invalid
upperCase('Custom message').validate('TEST This STRING'); // invalid with 'Custom message'
```


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
function values<ValidValue = any>(validator: Validator, message?: string): Validator<ValidValue>;
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
function valuesByKeys<ValidValue = any>(keys: string[], validator: Validator, message?: string): Validator<ValidValue>;
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


