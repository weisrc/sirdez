# Numbers

All numbers are stored in big-endian using `DataView` methods for its [performance](https://v8.dev/blog/dataview). There are two variants of numbers which have similar performance with different bundle size footprints.

## Variants

`sd.number` have an implementation for each of the following. It has a mapping to find the typer for a given `kind` and `size`. Using number will need to include all the below in the bundle.

::: warning
There is no input validation. Passing bad values will result it to return `undefined`. Thus calling it will throw an error.
:::

`sd.evalNumber` is code generating maker that can create the following. Instead of mapping to a typer, it evokes `new Function` to create the typer, hence the bundle size will be smaller.

::: warning
There is no input validation. Passing bad values will result in either errors when invoking the returned typer or while generating it, or unexpected behaviors. Please fully use the power of TypeScript to prevent this.
:::

## Mappings

Both makers requires a `kind` and a `bitSize`.

Truth table for `sd.number` and `sd.evalNumber`.

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

## Specifications

All numbers are _directly_ encoded and decoded at the location of pointer `sd.Context#i` to then increment the pointer by the byte size of the datatype.
