# OneOf

OneOf allows you to serialize and deserialize a value of a union type, that is,
a value that can be of one of the multiple types. `sd.oneOf` takes
a definition object whose keys are names of possible types of a value,
and values are `sd.Serdes<T>` which are used to encode and decode
values of that type.

`sd.oneOf` maps each type to unique integer and writes it at the
beginning of the payload to differentiate between types. It's first
parameter is `headSd`, which is `sd.Serdes<number>` used to encode the
unique integer

The following `sd.oneOf` call:

```ts
const oneOf = sd.oneOf(sd.uint8, {
  a: sd.uint8,
  b: sd.array(sd.uint8, sd.uint8),

  foo: sd.struct({
    x: sd.float64,
    y: sd.float64
  })
});
```

will create `sd.Serdes<U>`, where `U` is a union type:

<!-- prettier-ignore-start -->
```ts
type U = {
  type: "a";
  value: number;
} | {
  type: "b";
  value: number[];
} | {
  type: "foo";
  value: {
    x: number;
    y: number;
  };
};
```
<!-- prettier-ignore-end -->

And types "a", "b" and "foo" will be mapped to unique integer encoded
by `sd.uint8`

## Usage

```ts
const oneOf = sd.oneOf(sd.uint8, {
  a: sd.uint8,
  b: sd.array(sd.uint8, sd.uint8),

  foo: sd.struct({
    x: sd.float64,
    y: sd.float64
  })
});

const { toBytes, fromBytes } = sd.use(oneOf);

const obj: sd.GetType<typeof oneOf> = {
  type: "foo",
  value: {
    x: 42,
    y: 42
  }
};

const bytes = toBytes(obj);
const result = fromBytes(bytes);

switch (result.type) {
  case "a":
    console.log(typeof result.value); //number
    break;
  case "b":
    console.log(result.value.join(", "));
    break;
  case "foo":
    console.log(`x = ${result.value.x}, y = ${result.value.y}`);
    break;
}
```

## Specifications

`sd.oneOf` first serializes integer which is used to differentiate
different types, and then serializes a value of that type using the
corresponding `sd.Serdes<T>` in the definition object

Values of the integer are mapped to the properties of the definition
object (that is, possible types of a value) starting from `0`, in order in which
the properties appear on the object. So, in the example above values are mapped
to the properties (types) like this:

```
0 -> "a"
1 -> "b"
2 -> "foo"
```

The payload will be in the one of the following forms:

```
[headSd 0][a value (uint8)]
[headSd 1][b number of items (uint8)][...b items (uint8)]
[headSd 2][c.x (float64)][c.y (float64)]
```
