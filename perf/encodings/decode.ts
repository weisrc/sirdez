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
  suite("decode", id, {
    utf8() {
      ctx.i = 0;
      utf8.decode(ctx, length);
    },
    utf8js() {
      ctx.i = 0;
      utf8js.decode(ctx, length);
    },
    ucs2() {
      ctx.i = 0;
      ucs2.decode(ctx, length);
    },
    latin1() {
      ctx.i = 0;
      latin1.decode(ctx, length);
    },
    "utf8@node"() {
      ctx.i = 0;
      nodeUtf8.decode(ctx, length);
    },
    "ucs2@node"() {
      ctx.i = 0;
      nodeUcs2.decode(ctx, length);
    },
    "latin1@node"() {
      ctx.i = 0;
      nodeLatin1.decode(ctx, length);
    }
  });
}

test("10 Characters", "a".repeat(10));
test("50 Characters", "a".repeat(50));
