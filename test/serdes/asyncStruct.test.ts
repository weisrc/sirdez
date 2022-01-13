import {
  asyncEvalStruct,
  asyncEvalTuple,
  asyncStruct,
  AsyncStructFactory,
  asyncTuple,
  AsyncTupleFactory,
  createContext,
  string,
  GetType,
  uint8,
  utf8
} from "../../src";
import { asyncBoolean } from "./asyncBoolean";

function testStruct(struct: AsyncStructFactory, name: string) {
  const ctx = createContext();
  const data = { name: "Alice", amazing: true };

  const typer = struct({
    name: string(utf8, uint8),
    amazing: asyncBoolean
  });

  test(name + " encode", async () => {
    await typer.ser(ctx, data);
    expect(ctx.i).toBe(7);
  });

  test(name + " decode", async () => {
    ctx.i = 0;
    expect(await typer.des(ctx)).toEqual(data);
    expect(ctx.i).toBe(7);
  });
}

function testTuple(tuple: AsyncTupleFactory, name: string) {
  const ctx = createContext();
  const typer = tuple(string(utf8, uint8), asyncBoolean);
  const data: GetType<typeof typer> = ["Alice", true];

  test(name + " encode", async () => {
    await typer.ser(ctx, data);
    expect(ctx.i).toBe(7);
  });

  test(name + " decode", async () => {
    ctx.i = 0;
    expect(await typer.des(ctx)).toEqual(data);
    expect(ctx.i).toBe(7);
  });
}

testStruct(asyncStruct, "async.struct");
testTuple(asyncTuple, "async.tuple");

testStruct(asyncEvalStruct, "async.eval.struct");
testTuple(asyncEvalTuple, "async.eval.tuple");
