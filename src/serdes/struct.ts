import { define, StructFactory, TupleFactory } from "..";

const nameOf = (key: string) =>
  /*@__PURE__*/ isNaN(+key) ? /*@__PURE__*/ JSON.stringify(key) : key;

export const struct: StructFactory = (definition) => {
  const keys = /*@__PURE__*/ Object.keys(definition);
  const indexes = /*@__PURE__*/ Object.keys(keys).map((i) => +i);
  const values = /*@__PURE__*/ Object.values(definition);
  return /*@__PURE__*/ new Function(
    "d",
    `[${indexes.map((i) => "k" + i)}]`,
    `[${indexes.map((i) => "s" + i)}]`,
    `[${indexes.map((i) => "d" + i)}]`,
    `return d((c,d)=>{${indexes
      .map((i) => `s${i}(c,d[${nameOf(keys[i])}])`)
      .join(";")}},(c)=>{const d=${
      definition instanceof Array ? "[]" : "{}"
    };${indexes
      .map((i) => `d[${nameOf(keys[i])}]=d${i}(c)`)
      .join(";")};return d})`
  )(
    define,
    keys,
    /*@__PURE__*/ values.map(({ ser }) => ser),
    /*@__PURE__*/ values.map(({ des }) => des)
  );
};

export const tuple: TupleFactory = (...definition) =>
  struct(definition);
