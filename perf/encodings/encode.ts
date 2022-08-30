import { createContext, utf8, utf8js, ucs2, latin1 } from "../../src";
import {
  utf8 as nodeUtf8,
  ucs2 as nodeUcs2,
  latin1 as nodeLatin1
} from "../../src/node";
import { suite } from "../utils";

const ctx = createContext();

function test(id: string, data: string) {
  suite("encode", id, {
    "utf8"() {
      ctx.i = 0;
      utf8.encode(ctx, data);
    },
    "utf8js"() {
      ctx.i = 0;
      utf8js.encode(ctx, data);
    },
    "ucs2"() {
      ctx.i = 0;
      ucs2.encode(ctx, data);
    },
    "latin1"() {
      ctx.i = 0;
      latin1.encode(ctx, data);
    },
    "utf8@node"() {
      ctx.i = 0;
      nodeUtf8.encode(ctx, data);
    },
    "ucs2@node"() {
      ctx.i = 0;
      nodeUcs2.encode(ctx, data);
    },
    "latin1@node"() {
      ctx.i = 0;
      nodeLatin1.encode(ctx, data);
    }
  });
}

test("10 Characters", "a".repeat(10));
test("50 Characters", "a".repeat(50));
