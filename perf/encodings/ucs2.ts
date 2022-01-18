import { createContext, ucs2 } from "../../src";
import { ucs2 as nodeUcs2 } from "../../src/node";
import { suite } from "../utils";

const ctx = createContext();

function test(id: string, data: string) {
  const { length } = data;
  suite("encodings-ucs2", id, {
    "ucs2#encode"() {
      ctx.i = 0;
      ucs2.encode(ctx, data);
    },
    "ucs2#decode"() {
      ctx.i = 0;
      ucs2.decode(ctx, length);
    },
    "ucs2#encode@node"() {
      ctx.i = 0;
      nodeUcs2.encode(ctx, data);
    },
    "ucs2#decode@node"() {
      ctx.i = 0;
      nodeUcs2.decode(ctx, length);
    }
  });
}

test("100 Characters", "a".repeat(100));
test("500 Characters", "a".repeat(500));
