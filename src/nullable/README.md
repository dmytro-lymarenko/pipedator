- **Description**

Creates a validator which allows a value to be null in addition to the provided validator.

- **How to import**

```typescript
import { nullable } from 'pipedator';
// or
import { nullable } from 'pipedator/lib/nullable';

```
- **Signature**

```typescript
function nullable<ValidValue = any>(validator: Validator, message?: string): Validator<ValidValue>;
```
- **Parameters**

  - `validator` - some valildator to validate a value.
  - `message` - (optional) custom message.


- **Usage**

```typescript
const optionalNumber = nullable(number());
optionalNumber.validate(4); // valid
optionalNumber.validate(null); // valid
optionalNumber.validate(undefined); // invalid
```