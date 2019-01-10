- **Description**

Creates a validator which checks if a value (array) is sorted in the right order.

- **How to import**

```typescript
import { sorted } from 'pipedator';
// or
import { sorted } from 'pipedator/lib/sorted';

```
- **Signature**

```typescript
function sorted(direction: SortedDirection | SortedComparator, message?: string): Validator;
```
where
```typescript
type SortedDirection = 'asc' | 'desc';
// 'asc' is equal to ((a, b) => a - b) and 'desc' is equal to ((a, b) => b - a)

interface SortedComparator {
	(a: any, b: any): number; // should return negative value when a < b
}
```
- **Parameters**

  - `direction` - either a string ('asc' or 'desc') or a comparator which identifies the order the array should be sorted.
  - `message` - (optional) custom message


- **Usage**

```typescript
sorted('asc').validate([]); // valid as well as for 'desc'
sorted('asc').validate([1]); // valid as well as for 'desc'
sorted('asc').validate([1, 2, 3]); // valid
sorted('desc').validate([3, 2, 1]); // valid
// custom comparator
sorted((a, b) => a.x - b.x).validate([{ x: 1 }, { x: 2 }, { x: 3 }]); // valid
sorted('asc').validate([1, 2, 3, 5, 4, 6, 7, 8]); // invalid
sorted('desc').validate([4, 5, 3, 2, 1]); // invalid
sorted('asc', 'Custom message').validate([1, 2, 4, 3]); // invalid with 'Custom message'
```