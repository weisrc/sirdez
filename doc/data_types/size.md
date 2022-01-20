# Size

Size allows to store integers in a relatively compact format compared to others under `sd.number` at the cost of performance.

As its name sugest, it is best for storing the size of a payload, like `sd.string` or `sd.bytes`. It was implemented for extensibility and compatiblity with other specifications such as Apache Avro and Protocol Buffers.

## Variants

- `sd.size` for signed integers.
- `sd.usize` for unsigned integers.

## Usage

Creating an Apache Avro string.

```ts
const { toBytes, fromBytes } = sd.string(sd.utf8, sd.size);
```

## Specifications

`sd.usize` implements the variable integer encoding. `sd.size` wraps `sd.usize` to add negative numbers.

- `sd.usize` implements https://developers.google.com/protocol-buffers/docs/encoding#varints
- `sd.size` implements https://developers.google.com/protocol-buffers/docs/encoding#signed-ints
