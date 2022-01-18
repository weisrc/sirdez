import { createContext, utf8, utf8js, ucs2, latin1 } from "../../src";
import {
  utf8 as nodeUtf8,
  ucs2 as nodeUcs2,
  latin1 as nodeLatin1
} from "../../src/node";
import { suite } from "../utils";

const ctx = createContext();

function test(id: string, data: string) {
  const { length } = data;
  suite("encodings", id, {
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
    "ucs2#encode"() {
      ctx.i = 0;
      ucs2.encode(ctx, data);
    },
    "ucs2#decode"() {
      ctx.i = 0;
      ucs2.decode(ctx, length);
    },
    "latin1#encode"() {
      ctx.i = 0;
      latin1.encode(ctx, data);
    },
    "latin1#decode"() {
      ctx.i = 0;
      latin1.decode(ctx, length);
    },
    "utf8#encode@node"() {
      ctx.i = 0;
      nodeUtf8.encode(ctx, data);
    },
    "utf8#decode@node"() {
      ctx.i = 0;
      nodeUtf8.decode(ctx, length);
    },
    "ucs2#encode@node"() {
      ctx.i = 0;
      nodeUcs2.encode(ctx, data);
    },
    "ucs2#decode@node"() {
      ctx.i = 0;
      nodeUcs2.decode(ctx, length);
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
