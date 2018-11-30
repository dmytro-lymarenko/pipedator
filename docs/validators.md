<!--- This file is generated automatically by `scripts/buildDocs.ts`. Please, don't change it. --->
# Validators

- [`abstractShape`](#abstractShape)
- [`alt`](#alt)
- [`alternative`](#alternative)
- [`both`](#both)
- [`either`](#either)
- [`empty`](#empty)
- [`equalTo`](#equalTo)
- [`every`](#every)
- [`failure`](#failure)
- [`greater`](#greater)
- [`keys`](#keys)
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
- [`valuesByKeys`](#valuesByKeys)
- [`when`](#when)

## `abstractShape`

Not yet documented


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


## `keys`

Not yet documented


## `nullable`

Not yet documented


## `optional`

Not yet documented


## `pipe`

Not yet documented


## `shape`

Not yet documented


## `some`

Not yet documented


## `string`

Not yet documented


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


