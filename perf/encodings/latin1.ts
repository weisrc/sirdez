import { createContext, latin1 } from "../../src";
import { latin1 as nodeLatin1 } from "../../src/node";
import { suite } from "../utils";

const ctx = createContext();

function test(id: string, data: string) {
  const { length } = data;
  suite("encodings-latin1", id, {
    "latin1#encode"() {
      ctx.i = 0;
      latin1.encode(ctx, data);
    },
    "latin1#decode"() {
      ctx.i = 0;
      latin1.decode(ctx, length);
    },
    "latin1#encode@node"() {
      ctx.i = 0;
      nodeLatin1.encode(ctx, data);
    },
    "latin1#decode@node"() {
      ctx.i = 0;
      nodeLatin1.decode(ctx, length);
    }
  });
}

test("10 Characters", "a".repeat(10));
test("50 Characters", "a".repeat(50));
