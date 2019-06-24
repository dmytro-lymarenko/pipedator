- **Description**

Creates a validator to apply passed validator on the property of the value.

- **How to import**

```typescript
import { prop } from 'pipedator';
// or
import { prop } from 'pipedator/lib/prop';
```

- **Signature**

```typescript
function prop<ValidValue = any>(propName: string, validator: Validator<ValidValue>): Validator<ValidValue>;
```

- **Parameters**

  - `propName` - the property name to get value to test.
  - `validator` - validator to apply for property value.

* **Usage**

```typescript
prop('length', equalTo(3)).validate([1, 2, 'string']); // valid
prop('a', prop('b', string())).validate({ a: { b: 'some string' } }); // valid
prop('length', number()).validate(5); // invalid
```
