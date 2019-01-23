- **Description**

Creates a validator which requires value to be undefined.

- **How to import**

```typescript
import { forbidden } from 'pipedator';
// or
import { forbidden } from 'pipedator/lib/forbidden';

```
- **Signature**

```typescript
function forbidden<ValidValue = any>(message?: string): Validator<ValidValue>;
```
- **Parameters**

  - `message` - (optional) custom message.


- **Usage**

```typescript
const forbiddenNumber = forbidden();
forbiddenNumber.validate(undefined); // valid
forbiddenNumber.validate(4); // invalid
forbiddenNumber.validate(null); // invalid
```