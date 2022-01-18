import { createContext, utf8, utf8js } from "../../src";
import { utf8 as nodeUtf8 } from "../../src/node";
import { suite } from "../utils";

const ctx = createContext();

function test(id: string, data: string) {
  const { length } = data;
  suite("encodings-utf8", id, {
    "utf8#encode"() {
      ctx.i = 0;
      utf8.encode(ctx, data);
    },
    "utf8#decode"() {
      ctx.i = 0;
      utf8.decode(ctx, length);
    },
    "utf8js#encode"() {
      ctx.i = 0;
      utf8js.encode(ctx, data);
    },
    "utf8js#decode"() {
      ctx.i = 0;
      utf8js.decode(ctx, length);
    },
    "utf8#encode@node"() {
      ctx.i = 0;
      nodeUtf8.encode(ctx, data);
    },
    "utf8#decode@node"() {
      ctx.i = 0;
      nodeUtf8.decode(ctx, length);
    }
  });
}

test("10 Characters", "a".repeat(10));
test("50 Characters", "a".repeat(50));
