# Components

The purpose of this section is to familiarize with the components and their relationships as well as their use cases. With this knowledge, you will be capable of fully extending Sir Dez to better fit your needs.

## SerDes

Sir Dez' SerDes are capable of serializing and deserializing data types and structures.

> Note: `sd` comes from `import * as sd from "sirdez"`

```ts
const { toBytes, fromBytes } = sd.uint8;
const bytes = toBytes(255);
const same255 = fromBytes(bytes);
console.log({ bytes, same255 });
```

`toBytes` encodes `255` to a new `Uint8Array`, therefore it is safe to store. It is using `slice` under the hood which creates a partial copy of the internal `Uint8Array` found at `sd.Context#bytes`.

`fromBytes` decodes the `encoded` back to a JavaScript number.

### Temporary serialization

```ts
const { toTempBytes } = sd.uint8;
```

Creating a new `Uint8Array` to return the encoded is not performant for larger data structures. To address this, converters have a second encoding method named `toTempBytes`. **`Uint8Array` returned by `toTempBytes` must be used at that instant because the data will be mutated on its next call.** It is using `subarray` under hood which does not return a copy.

### Asynchronous

For serialization schemes that require asynchronous code such as `crypto.sublte.encodeInto`, use `sd.AsyncSerDes`.

```ts
const { toBytes, toTempBytes, fromBytes } = encryptedUser;
```

> Although Sir Dez does not offer useful `AsyncSerDes`, there are many async factories implemented for extensibility.

## Factories

Sir Dez' Factories are the factories of typers. Factories are the functions responsible for composing typers and creating new typers dynamically.

```ts
const vector3dSerDes = sd.struct({
  x: sd.float64,
  y: sd.float64,
  z: sd.float64
});

const { toBytes, fromBytes } = vector3dSerDes;
```

`sd.struct` is a `sd.StructMaker`. It creates typers given a key-value schema of typers.

> Like `sd.SerDes`, factories have async variants. The async version of `sd.StructFactory` is `sd.AsyncStructFacotry` which creates `sd.AsyncSerDes`.

## Encodings

Encodings allow to encode string related data. Sir Dez comes with built-in encodings: `sd.utf8`, `sd.utf8js`, `sd.utf16`, `sd.ascii`.

> `sd.utf8` uses the native `TextEncoder` and `TextDecoder`. However, it somehow under performs for small strings, therefore `sd.utf8js` is recommended for small strings.

```ts
const { toBytes, fromBytes } = sd.string(sd.utf8js, sd.uint8);
```
