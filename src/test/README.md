- **Description**

Creates a validator which succeeds when provided predicate returns true and fails otherwise.

- **How to import**

```typescript
import { test } from 'pipedator';
// or
import { test } from 'pipedator/lib/test';

```
- **Signature**

```typescript
function test<ValidValue = any>(isValid: (value: any) => boolean, message: string): Validator<ValidValue>;
```
- **Parameters**

  - `isValid` - a predicate which indicates whether value is valid or not.
  - `message` - custom message.

- **Usage**

```typescript
test(value => value === 1, 'Value is not equal to 1').validate(1); // valid
test(value => value === 1, 'Value is not equal to 1').validate(2); // invalid
```