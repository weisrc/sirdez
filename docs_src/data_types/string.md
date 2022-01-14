# String

Strings in this library are exteremely versatile: you choose the encoding format and the header size.

> String header will determine the max size of string: they encode the length of the encoded string output.

`sd.string` is a `sd.StringFactory`: it creates `sd.SerDes<string>` with the specified encoding scheme and header size.

## Usage

This is how you can create a UTF8 encoded string with a maximum length of 255 (because the range of `sd.uint8` is [0, 255]).

```ts
const { toBytes, fromBytes } = sd.string(sd.utf8, sd.uint8);
```

::: warning
There are no input validation. Passing a string which too long will result in unexpected behaviors. Inputing a non-string value will most likely result in an error.
:::

## Encodings

Sir Dez comes with built-in string encodings.

- For compact and fast strings that require all unicode characters, use `sd.utf8js`.
- For longer compact strings that require all unicode characters, use `sd.utf8`.
- For fast encoding that require all unicode characters, use `sd.utf16`.
- For compact and fast encoding which only need the first 255 characters, use `sd.ascii`.

## Headers

Headers determine the size of the string.

- `sd.uint8` for strings of length [0, ~255].
- `sd.uint16` for strings of length [0, ~65 535].
- `sd.uint32` for strings of length [0, ~4 294 967 295]

::: warning
An **~** have been added because it is only an approximation. Depending the contents of string and the encoding, the number will change. The header determines the length of the encoded string payload, and not the length of the string in JavaScript (UTF16).
:::

## Specifications

The header is encoded before the main body of the string containing the encoded string.

```
[header][encoded string]
```

For example, if we have a string composed of ascii characters: `"hello world"`. The length of the string will be 11, hence the header value will be 11.

In the actual implementation, because the payload length is only known after the encoding process, we skip the header to write it after.
