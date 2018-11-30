```typescript
import { alternative } from 'pipedator';
// or
import { alternative } from 'pipedator/lib/alternative';

```
Creates new validator which succeedes when at least one validator from `validators` does.
- `validators` - an array of [Validator](#validator).
- `message` - an optional string which can be used to overwrite error message.
```typescript
const numberOrString = alternative([string(), number()]);
// numberOrString will succeed when provided value is either string or number:
numberOrString.validate(4) // valid
numberOrString.validate('text') // valid
numberOrString.validate({}) // invalid
```