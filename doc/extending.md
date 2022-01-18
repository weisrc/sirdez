# Extending

Sir Dez is built in a way which is easy to extend. You can integrate your own logic into Sir Dez quickly simply by defining two functions: a serializer (`sd.Ser`) and a deserializer (`sd.Des`) with `sd.define`.

## Data Type

In this example, we are going to create a union data type for `string` and `number` in TypeScript using other `sd.Serdes`.

During deserialization, to know if the payload data is a string or a number, we need to create a pivot. A simple `sd.uint8` will do the job: `1` for `string` and `0` for `number`.

```ts
const utf8String = sd.string(sd.utf8, sd.uint16);
const union: sd.Serdes<string | number> = sd.define(
  (ctx, data) => {
    if (typeof data === "string") {
      sd.uint8.ser(ctx, 1);
      utf8String.ser(ctx, data);
    } else {
      sd.uint8.ser(ctx, 0);
      sd.float64.ser(ctx, data);
    }
  },
  (ctx) =>
    sd.uint8.des(ctx) ? utf8String.des(ctx) : sd.float64.des(ctx)
);

const { toBytes, fromBytes } = sd.use(
  sd.struct({
    other: sd.uint8,
    stringOrNumber: union
  })
);
```

::: tip Contribute!
Feel free to create a pull request to add cool `sd.Serdes` you created.
:::

## Encoding

As of now, all Sir Dez' `sd.Encoding` are for strings. An encoding for any data type is possible, but is a preferable to create a `sd.Serdes` for that.

In this example, let's create an encoder for numbers in a string seperated by spaces (not very useful). `"1 2 3 4 5 6 7 8 9"`

```ts
const numbers: sd.Encoding<string> = {
  encode(ctx, data) {
    for (let n of data.split(" ")) {
      sd.float64.ser(+n);
    }
  },
  decode(ctx, size) {
    const arr = [];
    const end = ctx.i + size;
    while (ctx.i < end) {
      arr.push(sd.float64.des(ctx));
      ctx.i++;
    }
    return arr.join(" ");
  }
};
```
