# Number

All numbers are stored in big-endian using `DataView` methods for its [performance](https://v8.dev/blog/dataview). There are two variants of numbers which have similar performance with different bundle size footprints.

## Variants

`sd.number` have an implementation for each of the following. It has a mapping to find the `sd.Serdes` for a given `kind` and `bitSize`. Using number will need to include all the below in the bundle.

::: warning
There is no input validation. Passing bad values will result it to return `undefined`. Thus calling it will throw an error.
:::

`sd.number@eval` is code generating factory that can create the following. Instead of mapping to a `sd.Serdes`, it evokes `new Function` to create the `sd.Serdes`, hence the bundle size will be smaller.

> `sd.something@<module>` will be located at `"sirdez/<module>"` when importing, as well as all other _commmon_ exports.

::: warning
There is no input validation. Passing bad values will result in either errors when invoking the returned `sd.Serdes` or while generating it, or unexpected behaviors. Please fully use the power of TypeScript to prevent this.
:::

For non-dynamic numbers, please use `sd.<kind><size>` if you are using a few, or `sd.<kind><size>@eval`
if you are using most to reduce bundle size.

## Mappings

Both factories require a `kind` and a `bitSize` parameters.

Types table for `sd.number` and `sd.number@eval`.

| kind    | bitSize | returns        |
| ------- | ------- | -------------- |
| uint    | 8       | `sd.uint8`     |
| uint    | 16      | `sd.uint16`    |
| uint    | 32      | `sd.uint32`    |
| bigUint | 64      | `sd.bigUint64` |
| int     | 8       | `sd.int8`      |
| int     | 16      | `sd.int16`     |
| int     | 32      | `sd.int32`     |
| bigInt  | 64      | `sd.bigInt64`  |
| float   | 32      | `sd.float32`   |
| float   | 64      | `sd.float64`   |

All number data types have been exported. So avoid using `sd.number` or `sd.number@eval`
directly, as it creates unnecessary `sd.Serdes<number>` instances.

## Usage

Statically using numbers.

```ts
const { toBytes, fromBytes } = sd.use(sd.uint8);
```

Dynamically using numbers.

```ts
const { toBytes, fromBytes } = sd.use(sd.number("uint", 8));
```

## Specifications

All numbers are _directly_ serialized in big-endian at the location of pointer `sd.Context#i`, which
is then incremented by the byte size of the datatype.
