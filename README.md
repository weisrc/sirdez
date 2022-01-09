[![Byts][logo-img]][logo-url]

# **Super Byte [_SerDes_][serdes] for TypeScript**

**An easy-to-use performant binary serialization and deserialization tree-shakable library in TypeScript for Node, Deno and Browsers.**

[![ci][ci-img]][ci-url]
[![npm][npm-img]][npm-url]
[![coverage][coverage-img]][coverage-url]
[![report][report-img]][report-url]

## Deep Dive

### Installation

<details>
  <summary>Node (Webpack, Babel, React, Svelte, Vue, Svelte...)</summary>

##### In the terminal with NPM

```sh
npm i byts
```

##### Or with Yarn

```sh
yarn add byts
```

##### In the code with ES Modules

```ts
import * as byts from "byts";
```

##### or with CommonJS

```ts
const byts = require("byts");
```

</details>

<details>
<summary>Browser (without bundlers)</summary>

##### In HTML with UMD

```html
<script src="https://cdn.jsdelivr.net/npm/byts@latest/dist/byts.umd.js"></script>
```

##### In an ES module script (statically)

```js
import * as byts from "https://cdn.jsdelivr.net/npm/byts@latest/dist/byts.umd.js";
```

##### In an ES module script (dynamically)

```js
const byts = await import(
  "https://cdn.jsdelivr.net/npm/byts@latest/dist/byts.umd.js"
);
```

</details>

<details>
<summary>Deno</summary>

##### In code (statically)

```ts
import * as byts from "https://deno.land/x/byts";
```

##### In code (dynamically)

```ts
const byts = await import("https://deno.land/x/byts");
```

</details>

### Ignition

#### Simple snippet of code

```js
// create person typer
const personTyper = byts.struct({
  name: byts.string,
  age: byts.uint8
});

// use person typer
const { encode, decode } = byts.use(personTyper);

// encode
const encoded = encode({
  name: "Bob",
  age: 23
});
console.log("encoded", encoded);

// decode
const decoded = decode(encoded);
console.log("decoded", decoded);

// celebrate
console.log("🎉 Congratulations! 🎉");
```

#### Using TypeScript utilities

```ts
type Person = TypeOf<typeof personTyper>;

const bob: Person = {
  name: "Bob",
  age: 23
};
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
