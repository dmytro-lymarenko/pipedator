- **Description**

Creates a validator which allows a value to be undefined in addition to the provided validator.

- **How to import**

```typescript
import { optional } from 'pipedator';
// or
import { optional } from 'pipedator/lib/optional';

```
- **Signature**

```typescript
function optional<ValidValue = any>(validator: Validator, message?: string): Validator<ValidValue>;
```
- **Parameters**

  - `validator` - some valildator to validate a value.
  - `message` - (optional) custom message.


- **Usage**

```typescript
const optionalNumber = optional(number());
optionalNumber.validate(4); // valid
optionalNumber.validate(undefined); // valid
optionalNumber.validate(null); // invalid
```