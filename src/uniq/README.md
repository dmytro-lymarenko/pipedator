- **Description**

Creates a validator which checks if a value (array) contains only uniq items.

- **How to import**

```typescript
import { uniq } from 'pipedator';
// or
import { uniq } from 'pipedator/lib/uniq';

```
- **Signature**

```typescript
function uniq<ValidValue = any>(): Validator<ValidValue>;
function uniq<ValidValue = any>(isEqual: IsEqual): Validator<ValidValue>;
function uniq<ValidValue = any>(message: string): Validator<ValidValue>;
function uniq<ValidValue = any>(isEqual: IsEqual, message: string): Validator<ValidValue>;
```
where
```typescript
interface IsEqual {
	(a: any, b: any): boolean;
}
```
- **Parameters**

  - `isEqual` - a comparator which identifies whether two items are equal or not. The default value is `(a, b) => a === b`
  - `message` - (optional) custom message


- **Usage**

```typescript
uniq().validate([]); // valid
uniq().validate([1]); // valid
uniq().validate([1, 2, 3]); // valid

// custom comparator
uniq((a, b) => a.x === b.x).validate([{ x: 1 }, { x: 2 }, { x: 3 }]); // valid
uniq().validate([1, 2, 4, 2]); // invalid
uniq('Custom message').validate([5, 1, 3, 1, 2]); // invalid with 'Custom message'
uniq((a, b) => a.x === b.x, 'Custom message').validate([{ x: 2 }, { x: 2 }, { x: 3 }]); // invalid with 'Custom message'
```