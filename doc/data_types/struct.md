# Struct

Structs allow to encode more complex data structures. They serialize JavaScript objects. `sd.struct` takes a defintion which is a record of `sd.Serdes<T>` to create `sd.Serdes<Defintion>`.

## Variants

There are two variants of structs.

- `sd.struct@eval` uses `new Function` and generates a very fast function to serialize and deserialize an object.
- `sd.struct` does not use `new Function`, but it is much slower because it is implemented using a for loop.

> `sd.something@<module>` will be located at `"sirdez/<module>"` when importing, as well as all other _common_ exports.

## Usage

Simple 3D vector struct.

```ts
const defintion = {
  x: sd.float64,
  y: sd.float64,
  z: sd.float64
};

const { toBytes, fromBytes } = sd.use(sd.struct(definition));
```

## Specifications

Given a record of field names and `sd.Serdes<T>` values. It will serialize using the `sd.Serdes<T>` in the order presented by the definition, without any other metadata.

Using the example above, the serialized payload given a vector will be:

```
[vector.x][vector.y][vector.z]
```
