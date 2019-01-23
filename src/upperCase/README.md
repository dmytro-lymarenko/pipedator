- **Description**

Creates a validator which succeedes when value is in uppercase.

- *Notes*:
  - Value should be a string

- **How to import**

```typescript
import { upperCase } from 'pipedator';
// or
import { upperCase } from 'pipedator/lib/upperCase';

```
- **Signature**

```typescript
function upperCase<ValidValue = any>(message?: string): Validator<ValidValue>;
```
- **Parameters**
  - `message` - (optional) custom message.


- **Usage**

```typescript
upperCase().validate(''); // valid
upperCase().validate('TEST THIS STRING'); // valid
upperCase().validate('TEST This STRING'); // invalid
upperCase('Custom message').validate('TEST This STRING'); // invalid with 'Custom message'
```