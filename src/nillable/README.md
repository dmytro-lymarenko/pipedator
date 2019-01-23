- **Description**

Creates a validator which allows a value to be null or undefined in addition to the provided validator.

- **How to import**

```typescript
import { nillable } from 'pipedator';
// or
import { nillable } from 'pipedator/lib/nillable';

```
- **Signature**

```typescript
function nillable<ValidValue = any>(validator: Validator, message?: string): Validator<ValidValue>;
```
- **Parameters**

  - `validator` - some valildator to validate a value.
  - `message` - (optional) custom message.


- **Usage**

```typescript
const nillableNumber = nillable(number());
nillableNumber.validate(4); // valid
nillableNumber.validate(null); // valid
nillableNumber.validate(undefined); // valid
nillableNumber.validate(''); // invalid, not a number
```