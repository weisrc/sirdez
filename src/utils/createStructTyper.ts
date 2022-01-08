import {
  AsyncTyperStruct,
  Struct,
  TyperStruct,
  AsyncTyper,
  Typer
} from "../types";

const nameOf = (key: string) =>
  isNaN(+key) ? JSON.stringify(key) : key;

export function createStructTyper<
  T extends Struct,
  Async extends boolean
>(
  definition: Async extends true
    ? AsyncTyperStruct<T>
    : TyperStruct<T>,
  async: Async
): Async extends true ? AsyncTyper<T> : Typer<T> {
  const as = async ? "async " : "";
  const aw = async ? "await " : "";
  const keys = Object.keys(definition);
  const indexes = Object.keys(keys).map((i) => +i);
  const values = Object.values(definition);

  return new Function(
    `[${indexes.map((i) => "k" + i).join()}]`,
    `[${indexes.map((i) => "e" + i).join()}]`,
    `[${indexes.map((i) => "d" + i).join()}]`,
    `return{${as}encode(c,d){${indexes
      .map((i) => `${aw}e${i}(c,d[${nameOf(keys[i])}])`)
      .join(";")}},${as}decode(c){const d=${
      definition instanceof Array ? "[]" : "{}"
    };${indexes
      .map((i) => `d[${nameOf(keys[i])}]=${aw}d${i}(c)`)
      .join(";")};return d}}`
  )(
    keys,
    values.map(({ encode }) => encode),
    values.map(({ decode }) => decode)
  );
}
