# Design

This section will cover the design of Sir Dez as well as its objectives. Reading the following will help you determine if Sir Dez is the binary serialization that fits your requriements.

::: tip Why I authored this library?
I created Sir Dez because I wanted a compact performant binary serialization library with full TypeScript support that runs in Node, Deno and the browser for another project involving the WebCrypto API which only works with binary data.
:::

## TypeScript

TypeScript at first might seem like a pain to setup, but with the amount of tools available, a TypeScript project can easily be scafolded with a simple command while giving all of its benifits.

- Better code suggestions
- Compilation to many targets
- Minimize runtime errors
- Type error precognition

Sir Dez fully supports TypeScript meaning if you define a `sd.Serdes` and use it. TypeScript will warn you if you are using it with the wrong data type.

## Bundle Size

Sir Dez is fully tree-shakable with zero dependencies; the bundle will only include what you use. It can easily be tree-shaken because most of the code is atomic and decoupled. No worries, if you are using Sir Dez with a script tag, because Sir Dez' bundle size is only around 5 KiB and 2 KiB gzipped. The library also ships in many different bundles to fit your needs.

## Portability

The library is only using features available on most JavaScript runtimes, meaning it can run in multiple environments such as Node, Deno and the browser. Using common features also removes the need to bundle polyfills, thus reducing bundle size. The used features are:

- `Uint8Array`
- `DataView`
- `TextEncoder` for `sd.utf8#encode`
- `TextDecoder` for `sd.utf8#decode`

In Node environment (override):

- `Buffer.prototype.<encoding>Write` for `sd.<encoding>#encode`
- `Buffer.prototype.<encoding>Slice` for `sd.<encoding>#decode`

## Performance

Sir Dez aim to be as performant as possible in all environment. In fact, depending on the environment, different code will be used: when running in Node, Sir Dez will use Node's Buffer functions for encoding strings. This also explains the large performance gap for string intensive data types between Node and other environments such as the browser and Deno.

## Compression

Performance is great, but sending and storing data in a compact format is sometimes more important. Due to the flexibility of Sir Dez, you can store data in the most compact form possible without any elaborate compression algorithm to eliminate redundancy.
