# Optional

Optional type allows you to have a value that may or may not be there when serializing and deserializing.

`sd.optional` takes `sd`, a `sd.SerDes` that will serialize if there is a value.

## Asynchronous

The asynchronous version is `sd.asyncOptional` which behaves similarly, but takes a `sd.AsyncSerDes` as `sd` parameter.

## Usage

Optional number.

```ts
const { toBytes, fromBytes } = sd.optional(sd.uint8);
```

## Specifications

`sd.optional` uses a one byte header which is a boolean value to indicate if it has a value or not.

If value is not `undefined` or `null`

```
[byte 1][value (sd)]
```

Otherwise

```
[byte 0]
```
