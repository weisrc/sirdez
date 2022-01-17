# Struct

Structs allow to encode more complex data structures. They serialize JavaScript objects. `sd.struct` takes a defintion which is a record of `sd.SerDes<T>` to create `sd.SerDes<Defintion>`.

## Variants

There are two variants of structs.

- `sd.struct` uses `new Function` and generates a very fast function to serialize and deserialize an object.
- `sd.struct@no_eval` does not use `new Function`, but it is much slower because it is implemented using a for loop.

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

Given a record of field names and `sd.SerDes<T>` values. It will serialize using the `sd.SerDes<T>` in the order presented by the definition, without any other metadata.

Using the example above, the serialized payload given a vector will be:

```
[vector.x][vector.y][vector.z]
```
