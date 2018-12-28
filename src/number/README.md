- **Description**

Creates a validator to check if a value is a number or not.

- **How to import**

```typescript
import { number } from 'pipedator';
// or
import { number } from 'pipedator/lib/number';

```
- **Signature**

```typescript
function number(message?: string): Validator;
```
- **Parameters**

  - `message` - (optional) custom message.


- **Usage**

```typescript
number().validate(5); // valid
number().validate(NaN); // valid
number().validate('Some text'); // invalid
number('Custom message').validate(null); // invalid with 'Custom message'
```