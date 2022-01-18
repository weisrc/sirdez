# Bytes

Bytes data type allows to store `Uint8Array`.

`sd.bytes` is a `sd.BytesFactory`, given a `headSd` which will determine the maximum length of the `Uint8Array`.

## Usage

The below will create a `sd.Serdes<Uint8Array>` which cannot exceed a length of 2^16 - 1.

```ts
const { toBytes, fromBytes } = sd.use(sd.bytes(sd.uint16));
```

## Specifications

```
[payload length (headSd)][payload]
```

The `headSd` will be used to serialize and deserialize the payload length.
