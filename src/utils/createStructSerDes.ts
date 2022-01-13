import { define } from "../define";
import {
  AsyncStructDefinition,
  Struct,
  StructDefinition,
  AsyncSerDes,
  SerDes
} from "../types";

const nameOf = (key: string) =>
  /*@__PURE__*/ isNaN(+key) ? /*@__PURE__*/ JSON.stringify(key) : key;

export function createStructSerDes<
  T extends Struct,
  Async extends boolean
>(
  definition: Async extends true
    ? AsyncStructDefinition<T>
    : StructDefinition<T>,
  async: Async
): Async extends true ? AsyncSerDes<T> : SerDes<T> {
  const as = async ? "async " : "";
  const aw = async ? "await " : "";
  const keys = /*@__PURE__*/ Object.keys(definition);
  const indexes = /*@__PURE__*/ Object.keys(keys).map((i) => +i);
  const values = /*@__PURE__*/ Object.values(definition);
  return /*@__PURE__*/ new Function(
    "d",
    `[${indexes.map((i) => "k" + i).join()}]`,
    `[${indexes.map((i) => "s" + i).join()}]`,
    `[${indexes.map((i) => "d" + i).join()}]`,
    `return d(${as}(c,d)=>{${indexes
      .map((i) => `${aw}s${i}(c,d[${nameOf(keys[i])}])`)
      .join(";")}},${as}(c)=>{const d=${
      definition instanceof Array ? "[]" : "{}"
    };${indexes
      .map((i) => `d[${nameOf(keys[i])}]=${aw}d${i}(c)`)
      .join(";")};return d})`
  )(
    define,
    keys,
    /*@__PURE__*/ values.map(({ ser }) => ser),
    /*@__PURE__*/ values.map(({ des }) => des)
  );
}
