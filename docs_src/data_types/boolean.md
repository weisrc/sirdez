# Boolean

Boolean datatype is most basic of all. It consist of two values: `true` and `false`.

`sd.boolean` is under the hood simply a `sd.uint8` which encodes 1 for `true` and 0 for `false`.

## Usage

```ts
const { toBytes, fromBytes } = sd.boolean;
```

## Specifications

If `true` then

```
[byte 1]
```

Else

```
[byte 0]
```
