- **Description**

Creates a validator to check if a value is a string or not.

- **How to import**

```typescript
import { string } from 'pipedator';
// or
import { string } from 'pipedator/lib/string';

```
- **Signature**

```typescript
function string<ValidValue = any>(message?: string): Validator<ValidValue>;
```
- **Parameters**

  - `message` - (optional) custom message.


- **Usage**

```typescript
string().validate('Some text'); // valid
string().validate(5); // invalid
string('Custom message').validate(null); // invalid with 'Custom message'
```