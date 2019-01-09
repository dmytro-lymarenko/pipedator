- **Description**

Creates a validator for specified shape.

- **How to import**

```typescript
import { abstractShape } from 'pipedator';
// or
import { abstractShape } from 'pipedator/lib/abstractShape';

```
- **Signature**

```typescript
function abstractShape<Key>(
	keys: Key[],
	shape: (key: Key) => Validator,
	options?: AbstractShapeOptions,
	message?: string
): Validator;
```
- **Parameters**

  - `keys` - an array of keys. Usually they are numbers or strings.
  - `shape` - a function which returns a validator at `key` position in the `shape`.
  - `options` - (optional) options:
    - `.onlyFirstError` - (optional) indicates whether to return all errors or only the first one.
  - `message` - (optional) allows to set custom message when error occurs

- **Interfaces**

```typescript
interface AbstractShapeOptions {
	onlyFirstError?: boolean;
}
```

- **Usage**

To create a validator with the next shape:
```typescript
{
	foo: string;
	bar: number;
}
```
You can write:
```typescript
const shape: { [key: string]: Validator } = {
	foo: string(), // string validator
	bar: number(), // number validator
};

const fooBarShapeValidator = abstractShape(
	['foo', 'bar'],
	// As abstractShape is some kind of abstraction we can write here everything we need.
	// Here, in the example, we just take validators from created above object.
	// Key in the bellow function is one of the provided keys as the first argument to abstractShape function.
	key => shape[key]
);
```
and then validate a value:
```typescript
fooBarShapeValidator.validate({ foo: 'foo', bar: 5 }); // valid
fooBarShapeValidator.validate({ foo: 'foo', bar: 5, another: 'string' }); // also valid
fooBarShapeValidator.validate({ foo: 'foo', bar: '5' }); // invalid
```