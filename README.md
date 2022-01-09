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
npm i sirdez
```

##### Or with Yarn

```sh
yarn add sirdez
```

##### In the code with ES Modules

```ts
import * as sirdez from "sirdez";
```

##### or with CommonJS

```ts
const sirdez = require("sirdez");
```

</details>

<details>
<summary>Browser (without bundlers)</summary>

##### In HTML with UMD

```html
<script src="https://cdn.jsdelivr.net/npm/sirdez@latest/dist/sirdez.umd.js"></script>
```

##### In an ES module script (statically)

```js
import * as sirdez from "https://cdn.jsdelivr.net/npm/sirdez@latest/dist/sirdez.umd.js";
```

##### In an ES module script (dynamically)

```js
const sirdez = await import(
  "https://cdn.jsdelivr.net/npm/sirdez@latest/dist/sirdez.umd.js"
);
```

</details>

<details>
<summary>Deno</summary>

##### In code (statically)

```ts
import * as sirdez from "https://deno.land/x/sirdez";
```

##### In code (dynamically)

```ts
const sirdez = await import("https://deno.land/x/sirdez");
```

</details>

### Ignition

#### Simple snippet of code

```js
// create person typer
const personTyper = sirdez.struct({
  name: sirdez.string,
  age: sirdez.uint8
});

// use person typer
const { encode, decode } = sirdez.use(personTyper);

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
type Person = sirdez.TypeOf<typeof personTyper>;

const bob: Person = {
  name: "Bob",
  age: 23
};
```

<!-- urls -->

[serdes]: https://en.wikipedia.org/wiki/SerDes
[logo-img]: https://see.fontimg.com/api/renderfont4/rxaL/eyJyIjoiZnMiLCJoIjoxMjAsImZnYyI6IiNEQzE0M0MiLCJ0IjoxfQ/Qnl0cw/cube.png
[logo-url]: https://weisrc.github.io/sirdez
[ci-img]: https://github.com/weisrc/sirdez/actions/workflows/ci.yml/badge.svg
[ci-url]: https://github.com/weisrc/sirdez/actions/workflows/ci.yml
[npm-img]: https://img.shields.io/npm/v/sirdez?color=cb3837&label=npm&logo=npm
[npm-url]: https://www.npmjs.com/package/sirdez
[coverage-img]: https://img.shields.io/endpoint?url=https://weisrc.github.io/sirdez/coverage/badge.json
[coverage-url]: https://weisrc.github.io/sirdez/coverage
[report-img]: https://img.shields.io/endpoint?url=https://weisrc.github.io/sirdez/report/badge.json
[report-url]: https://weisrc.github.io/sirdez/report
