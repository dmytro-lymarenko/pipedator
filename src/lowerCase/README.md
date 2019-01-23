- **Description**

Creates a validator which succeedes when value is in lowercase.

- *Notes*:
  - Value should be a string

- **How to import**

```typescript
import { lowerCase } from 'pipedator';
// or
import { lowerCase } from 'pipedator/lib/lowerCase';

```
- **Signature**

```typescript
function lowerCase<ValidValue = any>(message?: string): Validator<ValidValue>;
```
- **Parameters**
  - `message` - (optional) custom message.


- **Usage**

```typescript
lowerCase().validate(''); // valid
lowerCase().validate('test this string'); // valid
lowerCase().validate('test This string'); // invalid
lowerCase('Custom message').validate('test This string'); // invalid with 'Custom message'
```