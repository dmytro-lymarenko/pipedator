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