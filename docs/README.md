# 0.4.x API Reference (Pre-release)


- [Pipedator](#pipedator)
  - [Core](#core)
  - [Validators](./validators.md)
  - [Interfaces](#interfaces)
    - [`Validator`](#validator)


# Pipedator


## Core

This library is inspired by `pipe`s from [rxjs](https://rxjs-dev.firebaseapp.com/).
The core of the pipedator is `createValidator` function which can be imported from core:

```typescript
import { createValidator } from 'pipedator';
// or
import { createValidator } from 'pipedator/lib/core';
```

`createValidator` is used to create any validators and has the next shape:
```typescript
function createValidator<ValidValue = any>(options: CreateValidatorOptions): Validator<ValidValue> {}
```
- `options` - is an object
- `options.validate` - is a function which takes current value as the first argument and current context as the second one and returns either null when value is valid or an error.

For example, to create a validator which checks whether the value is a number or not we can write this:
```typescript
// It is recommended to have a possibility to set a custom message for generated error.
function number(message?: string) {
	return createValidator({
		validate: (value, ctx) =>
			typeof value === 'number'
				? // We return null because value satisfies our condition to be a number
				  null
				: // This method from context generate an error and we need to return it when value is invalid
				  // getCurrentPath is taken from core
				  { message: message || 'Value should be a number', path: getCurrentPath(ctx), children: null },
	});
}
```


## Interfaces

### `Validator`
