# Record

Records allow to store key-value data. For example a phone book where the name of someone maps to a phone number.

## Parameters

`sd.record` takes `sd`, `headSd` and `keySd`.

- `sd` is the serializer/deserializer for the value components of the record.
- `headSd` is the header that will indicate the amount of entries in the record.
- `keySd` is the serializer/deserializer for the key components of the record.

## Asynchronous

`sd.asyncRecord` is available, but should be avoided because it is slow.

## Usage

A simple record that indexes users by id.

```ts
const id = sd.string(sd.ascii, sd.uint8);
const user = sd.struct({
  id,
  name: sd.string(sd.utf8, sd.uint8),
  age: sd.uint8
});

const { toBytes, fromBytes } = sd.record(user, sd.uint16, id);
```

## Specifications

```
[amount of key-value pairs (headSd)][...[key (keySd)][value (sd)]]
```

The amount of key-value pairs will be encoded at the start of the payload. It will then be followed by the actual pairs.
