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