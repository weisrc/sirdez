# Array

Arrays allow you to store elements of a specific type. For example vertices, transactions, users... `sd.array` will require a `sd.SerDes` which will be used to encode the items, and a `headSd` which is a `sd.SerDes<number>` to encode the number of items in the array.

## Headers

Headers determine the size of the array.

- `sd.uint8` for arrays of length [0, 255].
- `sd.uint16` for arrays of length [0, 65 535].
- `sd.uint32` for arrays of length [0, 4 294 967 295]

## Asynchronous

To store items that require asynchronous serialization and deserialization using `sd.AsyncSerDes`, use `sd.asyncArray`.

::: warning
Performance will be poor because the current implementation awaits every item in order.
:::

## Usage

Creating a `sd.SerDes` for points. It can store up to 65 535 items points as defined by `headSd` of `sd.uint16`.

```ts
const { toBytes, fromBytes } = sd.array(
  sd.evalStruct({ x: sd.float, y: sd.float }),
  sd.uint16
);
```

## Specifications

```
[number of items (headSd)][...items (sd)]
```

The number of items (`array.length`) will be encoded at the start of the payload using the provided `headSd`. Then the actual items serialized with `sd` will follow.
