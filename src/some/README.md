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