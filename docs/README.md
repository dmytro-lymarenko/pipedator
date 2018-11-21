<!-- version -->
# 0.1.0 API Reference
<!-- versionstop -->

<!-- toc -->

- [Pipedator](#pipedator)
  - [Validators](#validators)
    - [`abstractShape`](#validator-abstractShape)
	- [`alt(validators: Validator[], message?: string): Validator`](#altvalidators-validator-message-string-validator)
	- [`alternative(validators: Validator[], message?: string): Validator`](#altvalidators-validator-message-string-validator)
  - [Interfaces](#interfaces)
    - [`Validator`](#validator)

<!-- tocstop -->

# Pipedator

## Validators

### `alt(validators: Validator[], message?: string): Validator`
An alias for [`alternative`](#altvalidators-validator-message-string-validator)

### `alternative(validators: Validator[], message?: string): Validator`
Creates new validator which succeedes when at least one validator from `validators` does.
```typescript
const numberOrString = alternative([string(), number()]);
// numberOrString will succeed when provided value is either string or number:
numberOrString.validate(4) // valid
numberOrString.validate('text') // valid
numberOrString.validate({}) // invalid
```

## Interfaces

### `Validator`
