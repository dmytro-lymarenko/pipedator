```typescript
import { ignore } from 'pipedator';
// or
import { ignore } from 'pipedator/lib/ignore';

```
An alias for [`success`](#success)

- **Usage**

for example, in tuple we can write like this:

```typescript
tuple([number(), ignore(), string()]);
```