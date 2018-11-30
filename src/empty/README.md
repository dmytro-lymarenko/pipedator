```typescript
import { empty } from 'pipedator';
// or
import { empty } from 'pipedator/lib/empty';

```
Creates new validator which succeedes when value is empty.

*Notes*:
- Value is empty when `value.length === 0`
- This validator requires value to be defined:

```typescript
const validator = empty();

validator.validate(''); // valid
validator.validate('not empty string'); // invalid
validator.validate([]); // valid
validator.validate([1]); // invalid
validator.validate({ length: 0 }); // valid
validator.validate(null); // throws an error (trying to read property length from null)
validator.validate(undefined); // throws an error (trying to read property length from undefined)

```