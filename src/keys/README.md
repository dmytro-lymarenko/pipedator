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