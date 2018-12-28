- **Description**

Creates a validator which always fails (the opposite to [`success`](#success)).

- **How to import**

```typescript
import { failure } from 'pipedator';
// or
import { failure } from 'pipedator/lib/failure';

```
- **Signature**

```typescript
function failure(message?: string): Validator;
```
- **Parameters**

  - `message` - (optional) custom message.


- **Usage**

```typescript
failure().validate(1 /* or any other value */); // invalid
failure('Custom message').validate(1 /* or any other value */); // invalid with 'Custom message'
```