- **Description**

Creates a validator for matching a string against provided regexp.

- **How to import**

```typescript
import { match } from 'pipedator';
// or
import { match } from 'pipedator/lib/match';

```
- **Signature**

```typescript
function match<ValidValue = any>(regexp: RegExp, message?: string): Validator<ValidValue>;
```
- **Parameters**

  - `regexp` - provided regexp to test a string (value).
  - `message` - (optional) custom message.


- **Usage**

```typescript
match(/test/).validate('Some test have passed'); // valid
match(/test/).validate('Some text have be read'); // invalid
```