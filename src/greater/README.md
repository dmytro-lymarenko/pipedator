- **Description**

Creates a validator which checks if a value is greater than the provided `limit`.

- **How to import**

```typescript
import { greater } from 'pipedator';
// or
import { greater } from 'pipedator/lib/greater';

```
- **Signature**

```typescript
function greater<ValidValue = any>(limit: number | ValidationRef, message?: string): Validator<ValidValue>;
```
- **Parameters**

  - `limit` - any number the tested value should be greater than or the reference to the part of complex value (like object).
  - `message` - (optional) custom message


- **Usage**

```typescript
greater(1).validate(5); // valid
greater(5).validate(1); // invalid
greater(5).validate(5); // invalid because 5 < 5 returns false
greater(5, 'Custom message').validate(1); // invalid with 'Custom message'

import { shape, ref, number } from 'pipedator';

const validator = shape({ a: number(), b: greater(ref(['a'])) });

validator.validate({ a: 1, b: 5 }); // valid
validator.validate({ a: 5, b: 1 }); // invalid because value.b < value.a
```