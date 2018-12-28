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