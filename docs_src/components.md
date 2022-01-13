# Components

The purpose of this section is to familiarize with the components and their relationships as well as their use cases. With this knowledge, you will be capable of fully extending Sir Dez to better fit your needs.

## Converters

Sir Dez' converters are capable of encoding and decoding. `sd.use` creates a converter from a `sd.typer`.

> Note: `sd` comes from `import * as sd from "sirdez"`

```ts
const { encode, decode } = sd.use(uint8);
const encoded = encode(255);
const decoded = decode(encoded);
console.log({ encoded, decoded });
```

`encode` encodes `255` to a new `Uint8Array`, therefore it is safe to store. It is using `slice` under the hood which creates a partial copy of the internal `Uint8Array` found at `sd.Context#bytes`.

`decode` decodes the `encoded` back to a JavaScript number.

### Instant encode

```ts
const { instantEncode } = sd.use(sd.uint8);
```

Creating a new `Uint8Array` to return the encoded is not performant for larger data structures. To address this, converters have a second encoding method named `instantEncode`. _Instant_ do partially define its speed, but also how to use it. **`Uint8Array` returned by `instantEncode` must be used at that instant because the data will be mutated on its next call.** It is using `subarray` under hood which does not return a copy.

### Asynchronous

For encoding and decoding schemes that require asynchronous code such as `crypto.sublte.encodeInto`, use `sd.AsyncConverter` via `sd.asyncUse`.

```ts
const { encode, decode } = sd.asyncUse(encryptedUser);
```

> Although Sir Dez does not offer useful `async` typers, `async` makers and converters are implemented for extensibility.

## Typers

Sir Dez' typers are its foundation. Typers are responsible for marshalling a specific data type. Composing typers using makers allows for the creation of more complex and elaborate data structures.

There are two variants of typers.

- **Sync** for common use cases.
- **Async** for asynchronous typers.

> Async typers are mainly present for extensibility reasons. Async typers must be used with `sd.asyncUse`.

```ts
const n: sd.GetType<typeof sd.uint8> = 255;
```

`sd.uint8` is in fact `sd.Typer<number>` meaning it encodes and decodes `number` data.

## Makers

Sir Dez' makers are the factories of typers. Makers are the functions responsible for composing typers and creating new typers dynamically.

```ts
const vector3dTyper = sd.struct({
  x: sd.float64,
  y: sd.float64,
  z: sd.float64
});

const { encode, decode } = sd.use(vector3dTyper);
```

`sd.struct` is a `sd.StructMaker`. It creates typers given a key-value schema of typers.

> Like `sd.Typer` and `sd.Converter`, `sd.Maker` have async variants. The async version of `sd.StructMaker` is `sd.AsyncStructMaker` which creates `sd.AsyncTyper`.

## Sequencers

Sequencers allow to encode string related data. Sir Dez comes with built-in sequencers: `sd.utf8`, `sd.utf8js`, `sd.utf16`, `sd.ascii`.

> `sd.utf8` uses the native `TextEncoder` and `TextDecoder`. However, it somehow under performs for small strings, therefore `sd.utf8js` is recommended for small strings.

```ts
const { encode, decode } = sd.use(sd.string(sd.utf8js, sd.uint8));
```
