# Optional

Optional type allows you to have a value that may or may not be there when serializing and deserializing.

`sd.optional` takes `sd`, a `sd.SerDes` that will serialize if there is a value.

## Usage

Optional number.

```ts
const { toBytes, fromBytes } = sd.use(sd.optional(sd.uint8));
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
