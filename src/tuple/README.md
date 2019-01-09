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
function tuple(tuple: Validator[], options?: AbstractShapeOptions, message?: string): Validator;
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