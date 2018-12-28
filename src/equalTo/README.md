- **Description**

Creates a validator which checks if a value is strictly(===) equal to the provided `validValue`.

- **How to import**

```typescript
import { equalTo } from 'pipedator';
// or
import { equalTo } from 'pipedator/lib/equalTo';

```
- **Signature**

```typescript
function equalTo(validValue: any | ValidationRef, message?: string): Validator;
```
- **Parameters**

  - `validValue` - any value the tested value should be equal to or the reference to the part of complex value (like object).
  - `message` - (optional) custom message


- **Usage**

```typescript
equalTo('test').validate('test'); // valid
equalTo('test').validate('text'); // invalid
equalTo('test', 'Custom message').validate('text'); // invalid with 'Custom message'

import { shape, ref, string } from 'pipedator';

const validator = shape({ a: string(), b: equalTo(ref(['a'])) });

validator.validate({ a: 'test', b: 'test' }); // valid
validator.validate({ a: 'test', b: 'text' }); // invalid because value.b !== value.a
```