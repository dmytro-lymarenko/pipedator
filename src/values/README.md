- **Description**

The same as [`valuesByKeys`](#valuesbykeys) except it already provides all `keys` from value using `Object.keys` method.

- **How to import**

```typescript
import { values } from 'pipedator';
// or
import { values } from 'pipedator/lib/values';

```
- **Signature**

```typescript
function values<ValidValue = any>(validator: Validator, message?: string): Validator<ValidValue>;
```
- **Parameters**

  - `validator` - a validator to validate values.
  - `message` - (optional) custom message.

- **Usage**

```typescript
import { match, every } from 'pipedator';

values(every(match(/^test/))).validate({ a: 'testA', b: 'testB' }); // valid
values(every(match(/^test/))).validate({ a: 'testA', b: 'testB', c: 5 }); // invalid
values(every(match(/^test/)), 'Custom message').validate({ a: 'testA', b: 5 }); // invalid with 'Custom message'
```