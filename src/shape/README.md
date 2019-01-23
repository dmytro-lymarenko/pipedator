- **Description**

Creates a validator to test a value to have provided shape.

- **How to import**

```typescript
import { shape } from 'pipedator';
// or
import { shape } from 'pipedator/lib/shape';

```
- **Signature**

```typescript
function shape<ValidValue = any>(shape: { [key: string]: Validator }, options?: AbstractShapeOptions, message?: string): Validator<ValidValue>;
```
- **Parameters**

  - `shape` - an object in which each key is a validator to test the respective sub value from `value` by that key.
  - `options` - (optional) options (see [`abstractShape`](#abstractshape) for more details)
  - `message` - (optional) custom message.

- **Usage**

```typescript
import { number, string, shape } from 'pipedator';

shape({ a: number(), b: string() }).validate({ a: 1, b: 'text' }); // valid
shape({ a: number(), b: string() }).validate({ a: 1, b: 'text', c: {} }); // valid
shape({ a: number(), b: string() }).validate({ a: '1', b: 'text' }); // invalid, value.a is not a number
shape({ a: number(), b: string() }).validate({ a: 1 }); // invalid, value.b is not a string
shape({ a: number(), b: string() }, { onlyFirstError: true }).validate({ a: '1' }); // invalid, returns only one error
shape({ a: number(), b: string() }, undefined, 'Custom message').validate({ a: 1 }); // invalid with 'Custom message'
```