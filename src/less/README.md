- **Description**

Creates a validator which checks if a value is less than the provided `limit`.

- **How to import**

```typescript
import { less } from 'pipedator';
// or
import { less } from 'pipedator/lib/less';

```
- **Signature**

```typescript
function less<ValidValue = any>(limit: number | ValidationRef, message?: string): Validator<ValidValue>;
```
- **Parameters**

  - `limit` - any number the tested value should be less than or the reference to the part of complex value (like object).
  - `message` - (optional) custom message


- **Usage**

```typescript
less(5).validate(1); // valid
less(1).validate(5); // invalid
less(5).validate(5); // invalid because 5 > 5 returns false
less(1, 'Custom message').validate(5); // invalid with 'Custom message'

import { shape, ref, number } from 'pipedator';

const validator = shape({ a: number(), b: less(ref(['a'])) });

validator.validate({ a: 5, b: 1 }); // valid
validator.validate({ a: 1, b: 5 }); // invalid because value.b > value.a
```