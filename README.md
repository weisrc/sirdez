<div markdown="1" align="center">

[![Sir Dez][logo-img]][logo-url]

# **Glorious [_SerDes_][serdes] for TypeScript**

The **library** you can rely on,  
For **binary** **serialization** and **deserialization**,  
In **Node**, **Deno**, and the **Web** environment,  
Which is **simple** and yet **performant**.

[![npm][npm-img]][npm-url]
[![deno][deno-img]][deno-url]
[![ci][ci-img]][ci-url]
[![coverage][coverage-img]][coverage-url]
[![report][report-img]][report-url]

</div>

## Getting Started

### Installation

<details markdodwn="1">
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

<details markdodwn="1">
<summary>Web (without bundlers)</summary>

##### In HTML with UMD

```html
<script src="https://cdn.jsdelivr.net/npm/sirdez/dist/sirdez.umd.js"></script>
```

##### In an ES module script (statically)

```js
import * as sirdez from "https://cdn.jsdelivr.net/npm/sirdez/dist/sirdez.es.js";
```

##### In an ES module script (dynamically)

```js
const sirdez = await import(
  "https://cdn.jsdelivr.net/npm/sirdez/dist/sirdez.es.js"
);
```

</details>

<details markdodwn="1">
<summary>Deno</summary>

##### In code (statically)

```ts
import * as sirdez from "https://deno.land/x/sirdez/mod.ts";
```

##### In code (dynamically)

```ts
const sirdez = await import("https://deno.land/x/sirdez/mod.ts");
```

</details>

### Usage

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
console.log("🍷Cheers!🍺");
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
[logo-img]: https://see.fontimg.com/api/renderfont4/Zd2J/eyJyIjoiZnMiLCJoIjoxMjAsImZnYyI6IiNEQzE0M0MiLCJ0IjoxfQ/U2lyIERleg/x.png
[logo-url]: https://weisrc.github.io/sirdez
[ci-img]: https://github.com/weisrc/sirdez/actions/workflows/ci.yml/badge.svg
[ci-url]: https://github.com/weisrc/sirdez/actions/workflows/ci.yml
[npm-img]: https://img.shields.io/npm/v/sirdez?color=cb3837&label=npm&logo=npm
[npm-url]: https://www.npmjs.com/package/sirdez
[deno-img]: https://img.shields.io/github/v/release/weisrc/sirdez?color=white&include_prereleases&label=deno&logo=deno
[deno-url]: https://deno.land/x/sirdez
[coverage-img]: https://img.shields.io/endpoint?url=https://weisrc.github.io/sirdez/coverage/badge.json
[coverage-url]: https://weisrc.github.io/sirdez/coverage/lcov-report
[report-img]: https://img.shields.io/endpoint?url=https://weisrc.github.io/sirdez/report/badge.json
[report-url]: https://weisrc.github.io/sirdez/report
