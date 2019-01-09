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
function forbidden(message?: string): Validator;
```
- **Parameters**

  - `message` - (optional) custom message.


- **Usage**

```typescript
const forbiddenNumber = forbidden(number());
forbiddenNumber.validate(undefined); // valid
forbiddenNumber.validate(4); // invalid
forbiddenNumber.validate(null); // invalid
```