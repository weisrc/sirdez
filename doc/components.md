# Components

The purpose of this section is to familiarize with the components and their relationships as well as their use cases. With this knowledge, you will be capable of fully extending Sir Dez to better fit your needs.

## Serdes

Serdes are the building blocks used to create serializers and deserializers for complex data structures. However they are not very useful when used alone without a context. This is where `sd.UsableSerdes` come into play.

> Note: `sd` comes from `import * as sd from "sirdez"`

## UsableSerdes

UsableSerdes are capable of serializing and deserializing data types and structures. A `sd.SerDes` can be easily converted into it with `sd.use`.

```ts
const { toBytes, fromBytes } = sd.use(sd.uint8);
const bytes = toBytes(255);
const same255 = fromBytes(bytes);
console.log({ bytes, same255 });
```

`toBytes` encodes `255` to a new `Uint8Array`, therefore it is safe to store. It is using `slice` under the hood which creates a partial copy of the internal `Uint8Array` found at `sd.Context#bytes`.

`fromBytes` decodes the `encoded` back to a JavaScript number.

### Unsafe serialization

```ts
const { toUnsafeBytes } = sd.uint8;
```

Creating a new `Uint8Array` to return the encoded is not performant for larger data structures. To address this, converters have a second encoding method named `toUnsafeBytes`. **`Uint8Array` returned by `toUnsafeBytes` must be used immediately and should not be stored because the data will be mutated on its next call.** It is using `subarray` under hood which does not return a copy.

## Factories

Sir Dez' Factories are the factories of `sd.Serdes`. Factories are the functions responsible for composing `sd.Serdes` and creating new `sd.Serdes` dynamically.

```ts
const vector3dSerdes = sd.struct({
  x: sd.float64,
  y: sd.float64,
  z: sd.float64
});

const { toBytes, fromBytes } = sd.use(vector3dSerdes);
```

`sd.struct` is a `sd.StructFactory`. It creates `sd.Serdes` given a key-value schema of `sd.Serdes`.

## Encodings

Encodings allow to encode string related data. Sir Dez comes with built-in encodings: `sd.utf8`, `sd.utf8js`, `sd.ucs2`, `sd.latin1`.

> `sd.utf8` uses the native `TextEncoder` and `TextDecoder`. However, it somehow under performs for small strings, therefore `sd.utf8js` is recommended for small strings.

```ts
const { toBytes, fromBytes } = sd.use(sd.string(sd.utf8js, sd.uint8));
```

## Invalid Length Message Error Handling

The following statements summarizes how invalid length messages are handled:
- Deserialize will throw RangeError for messages of invalid length
- Deserialize will not process the extra bytes of a message that is too long
- Deserialize internally successfully deserialize the message if it is too long, but will throw the error if the message is too long

The error message it throws in case of an invalid length message are DataView out of bounds error and the following:
```ts
RangeError(`Expected to process ${length} bytes, processed ${ctx.i} bytes instead`);
```