- **Description**

Creates a validator which succeedes when value is negative (0 is not negative for this validator).

- **How to import**

```typescript
import { negative } from 'pipedator';
// or
import { negative } from 'pipedator/lib/negative';

```
- **Signature**

```typescript
function negative(message?: string): Validator;
```
- **Parameters**
  - `message` - (optional) custom message.


- **Usage**

```typescript
negative().validate(-1); // valid
negative().validate(-10); // valid
negative().validate(0); // invalid
negative().validate(1); // invalid
```