[![Byts][logo-img]][logo-url]

# **Super byte [SerDes][serdes] for TypeScript**

**A easy-to-use performant binary serialization and deserialization tree-shakable library**

[![ci][ci-img]][ci-url]
[![npm][npm-img]][npm-url]
[![coverage][coverage-img]][coverage-url]
[![report][report-img]][report-url]

## Deep Dive

```ts
import { use, utf8, string, uint8, struct, TypeOf } from "byts";

const person = struct({
  name: string,
  age: uint8
});

const { encode, decode } = use(person);

const bob: TypeOf<typeof person>

console.log({encoded: encode})
```

<!-- urls -->

[serdes]: https://en.wikipedia.org/wiki/SerDes
[logo-img]: https://see.fontimg.com/api/renderfont4/rxaL/eyJyIjoiZnMiLCJoIjoxMjAsImZnYyI6IiNEQzE0M0MiLCJ0IjoxfQ/Qnl0cw/cube.png
[logo-url]: https://weisrc.github.io/byts
[ci-img]: https://github.com/weisrc/byts/actions/workflows/ci.yml/badge.svg
[ci-url]: https://github.com/weisrc/byts/actions/workflows/ci.yml
[npm-img]: https://img.shields.io/npm/v/byts?color=cb3837&label=npm&logo=npm
[npm-url]: https://www.npmjs.com/package/byts
[coverage-img]: https://img.shields.io/endpoint?url=https://weisrc.github.io/byts/coverage/badge.json
[coverage-url]: https://weisrc.github.io/byts/coverage
[report-img]: https://img.shields.io/endpoint?url=https://weisrc.github.io/byts/report/badge.json
[report-url]: https://weisrc.github.io/byts/report
