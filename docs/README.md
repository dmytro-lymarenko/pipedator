# 0.1.x API Reference (UNSTABLE)


- [Pipedator](#pipedator)
  - [Validators](#validators)
    - [`abstractShape`](#validator-abstractShape)
	- [`alt(validators: Validator[], message?: string): Validator`](#altvalidators-validator-message-string-validator)
	- [`alternative(validators: Validator[], message?: string): Validator`](#alternativevalidators-validator-message-string-validator)
	- [`both(validators: Validator[], message?: string): Validator`](#bothvalidators-validator-message-string-validator)
    - [`either(validators: Validator[], message?: string): Validator`](#eithervalidators-validator-message-string-validator)
    - [`empty(message?: string): Validator`](#emptymessage-string-validator)
  - [Interfaces](#interfaces)
    - [`Validator`](#validator)


# Pipedator

## Validators


### `alt(validators: Validator[], message?: string): Validator`
```typescript
import { alt } from 'pipedator';
// or
import { alt } from 'pipedator/lib/alt';

```
An alias for [`alternative`](#alternativevalidators-validator-message-string-validator)


### `alternative(validators: Validator[], message?: string): Validator`
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

### `both(validators: Validator[], message?: string): Validator`
```typescript
import { both } from 'pipedator';
// or
import { both } from 'pipedator/lib/both';

```
An alias for [`pipe`](#pipevalidators-validator-message-string-validator)


### `either(validators: Validator[], message?: string): Validator`
```typescript
import { either } from 'pipedator';
// or
import { either } from 'pipedator/lib/either';

```
An alias for [`alternative`](#alternativevalidators-validator-message-string-validator)


### `empty(message?: string): Validator`
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


## Interfaces

### `Validator`
