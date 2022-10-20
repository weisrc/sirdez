<div markdown="1" align="center">

[![Sir Dez][logo-badge]][logo-url]

# **Glorious [_SerDes_][serdes] for TypeScript**

The **library** you can rely on,  
For **binary** **serialization** and **deserialization**,  
In **Node**, **Deno**, and the **Web** environment,  
Which is **simple** and yet **performant**.

[![npm][npm-badge]][npm-url]
[![deno][deno-badge]][deno-url]
[![ci][ci-badge]][ci-url]
[![coverage][coverage-badge]][coverage-url]
[![report][report-badge]][report-url]
[![docs][docs-badge]][docs-url]
[![perf][perf-badge]][perf-url]
[![bundle][bundle-badge]][bundle-url]

</div>

## Features

- Performant
- Easy to use
- Full TypeScript support
- Super extensible
- 99% tree-shakable
- Zero dependencies (small footprint)
- Runs in Node, Deno and browsers
- No `eval()` or `Function()` by default
- Performant eval mode with `import "sirdez/eval"`
- MessagePack for schemaless data
- [More details...][design-url]

**Performance Comparison with other tools in Node (ops/sec)**

[![performance][perf-chart]][perf-url]

## Installation

Expand for more details.

<details markdodwn="1">
  <summary>Node (with or without bundlers)</summary>

#### In the terminal with NPM

```sh
npm i sirdez
```

#### Or with Yarn

```sh
yarn add sirdez
```

#### In the code with ES Modules

```ts
import * as sd from "sirdez";
```

#### or with CommonJS

```ts
const sd = require("sirdez");
```

</details>

<details markdodwn="1">
<summary>Web (without bundlers)</summary>

#### In HTML with UMD

```html
<script src="https://cdn.jsdelivr.net/npm/sirdez/dist/sirdez.umd.js"></script>
```

#### In an ES module script (statically)

```js
import * as sd from "https://cdn.jsdelivr.net/npm/sirdez/dist/sirdez.es.js";
```

#### In an ES module script (dynamically)

```js
const sd = await import(
  "https://cdn.jsdelivr.net/npm/sirdez/dist/sirdez.es.js"
);
```

</details>

<details markdodwn="1">
<summary>Deno</summary>

#### In code (statically)

```ts
import * as sd from "https://deno.land/x/sirdez/mod.ts";
```

#### In code (dynamically)

```ts
const sd = await import("https://deno.land/x/sirdez/mod.ts");
```

</details>

## Usage

#### Creating a simple SerDes.

```js
const person = sd.use(
  sd.struct({
    name: sd.string(sd.utf8, sd.uint8),
    age: sd.uint8
  })
);

const bytes = person.toBytes({
  name: "Bob",
  age: 23
});

const samePerson = person.fromBytes(bytes);

console.log({ bytes, samePerson });
```

#### Using TypeScript utilities

```ts
type Person = sd.GetType<typeof person>;

const bob: Person = {
  name: "Bob",
  age: 23
};
```

## Roadmap

- Support decorators for schema
- `msgpack` extension mechanism using classes
- Better support for protocol buffers
- Avro-Sirdez schema transpiler

## Known Issues

- `msgpack` becomes very slow for large arrays (help wanted for optimizing it! 🙏)

## Resources

- [Documentation][docs-url]
- [Coverage Report][coverage-url]
- [Test Report][report-url]
- [Performance Report][perf-url]
- [NPM package][npm-url]
- [Deno Land][deno-url]
- [GitHub Action CI][ci-url]

## Contribution

Help and suggestions are welcomed!

## License

Copyright 2022 Wei (weisrc).

This software is under the MIT license.

Please see [LICENSE][license-url] for more information.

<!-- urls -->

[serdes]: https://en.wikipedia.org/wiki/SerDes
[logo-badge]: https://see.fontimg.com/api/renderfont4/Zd2J/eyJyIjoiZnMiLCJoIjoxMjAsImZnYyI6IiNEQzE0M0MiLCJ0IjoxfQ/U2lyIERleg/x.png
[logo-url]: https://weisrc.github.io/sirdez
[ci-badge]: https://github.com/weisrc/sirdez/actions/workflows/ci.yml/badge.svg
[ci-url]: https://github.com/weisrc/sirdez/actions/workflows/ci.yml
[npm-badge]: https://img.shields.io/npm/v/sirdez?color=cb3837&label=npm&logo=npm
[npm-url]: https://www.npmjs.com/package/sirdez
[deno-badge]: https://img.shields.io/github/v/release/weisrc/sirdez?color=white&include_prereleases&label=deno&logo=deno
[deno-url]: https://deno.land/x/sirdez
[coverage-badge]: https://img.shields.io/endpoint?url=https://weisrc.github.io/sirdez/badges/coverage.json
[coverage-url]: https://weisrc.github.io/sirdez/coverage/lcov-report
[report-badge]: https://img.shields.io/endpoint?url=https://weisrc.github.io/sirdez/badges/report.json
[report-url]: https://weisrc.github.io/sirdez/report
[perf-badge]: https://img.shields.io/endpoint?url=https://weisrc.github.io/sirdez/badges/perf.json
[perf-chart]: https://weisrc.github.io/sirdez/perf/main.png
[perf-url]: https://weisrc.github.io/sirdez/performance
[docs-badge]: https://img.shields.io/badge/docs-vuepress-41B883?logo=readthedocs
[docs-url]: https://weisrc.github.io/sirdez
[design-url]: https://weisrc.github.io/sirdez/design
[bundle-badge]: https://img.shields.io/bundlephobia/minzip/sirdez
[bundle-url]: https://bundlephobia.com/package/sirdez
[license-url]: https://github.com/weisrc/sirdez/blob/main/LICENSE
