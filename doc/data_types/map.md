# Map

Maps allow to store key-value data. For example a phone book where the name of someone maps to a phone number.

## Parameters

`sd.map` takes `keySd`, `valueSd` and `headSd`.

- `keySd` is the serializer/deserializer for the key components of the map.
- `valueSd` is the serializer/deserializer for the value components of the map.
- `headSd` is the header that will indicate the amount of entries in the map.

## Usage

A simple map that indexes users by id.

```ts
const id = sd.string(sd.ascii, sd.uint8);
const user = sd.struct({
  id,
  name: sd.string(sd.utf8, sd.uint8),
  age: sd.uint8
});

const { toBytes, fromBytes } = sd.use(sd.map(user, sd.uint16, id));
```

## Specifications

```
[amount of key-value pairs (headSd)][...[key (keySd)][value (valueSd)]]
```

The amount of key-value pairs will be encoded at the start of the payload. It will then be followed by the actual pairs.
