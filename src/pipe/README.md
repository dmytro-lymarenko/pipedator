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
function pipe(validators: Validator[], message?: string): Validator;
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