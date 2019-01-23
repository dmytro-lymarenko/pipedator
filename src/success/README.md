- **Description**

Creates a validator which always fails (the opposite to [`failure`](#failure)).

- **How to import**

```typescript
import { success } from 'pipedator';
// or
import { success } from 'pipedator/lib/success';

```
- **Signature**

```typescript
function success<ValidValue = any>(): Validator<ValidValue>;
```

- **Usage**

```typescript
success().validate(1 /* or any other value */); // valid
```