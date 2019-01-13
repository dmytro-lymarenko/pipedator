- **Description**

Creates a validator to check if a value is defined (not null and not undefined).

- **How to import**

```typescript
import { defined } from 'pipedator';
// or
import { defined } from 'pipedator/lib/defined';

```
- **Signature**

```typescript
function defined(message?: string): Validator;
```
- **Parameters**

  - `message` - (optional) custom message.


- **Usage**

```typescript
defined().validate(''); // valid
defined().validate(0); // valid
defined().validate(undefined); // invalid
defined('Custom message').validate(null); // invalid with 'Custom message'
```