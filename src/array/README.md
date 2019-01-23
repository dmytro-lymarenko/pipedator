- **Description**

Creates a validator to check if a value is an array or not.

- **How to import**

```typescript
import { array } from 'pipedator';
// or
import { array } from 'pipedator/lib/array';

```
- **Signature**

```typescript
function array<ValidValue = any>(message?: string): Validator<ValidValue>;
```
- **Parameters**

  - `message` - (optional) custom message.


- **Usage**

```typescript
array().validate([1, 2, 'string']); // valid
array().validate(5); // invalid
array('Custom message').validate(null); // invalid with 'Custom message'
```