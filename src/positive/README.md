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
function positive(message?: string): Validator;
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