function createContext(size = 1024) {
  const buffer = new ArrayBuffer(size);
  return {
    i: 0,
    view: new DataView(buffer),
    bytes: new Uint8Array(buffer)
  };
}
function growContext(ctx) {
  ctx.bytes = new Uint8Array(ctx.bytes.length * 2);
  ctx.view = new DataView(ctx.bytes.buffer);
}
function contextFromArray(array2) {
  return {
    i: 0,
    bytes: array2,
    view: new DataView(array2.buffer, array2.byteOffset, array2.byteLength)
  };
}
const ascii = {
  encode(ctx, data) {
    const { length } = data;
    for (let i = 0; i < length; i++) {
      ctx.view.setUint8(ctx.i++, data.charCodeAt(i));
    }
  },
  decode(ctx, end) {
    return String.fromCharCode.apply(null, ctx.bytes.subarray(ctx.i, ctx.i = end));
  }
};
const utf16 = {
  encode(ctx, data) {
    const { length } = data;
    for (let i = 0; i < length; i++) {
      ctx.view.setUint16(ctx.i, data.charCodeAt(i));
      ctx.i += 2;
    }
  },
  decode(ctx, end) {
    const codes = [];
    while (ctx.i < end) {
      codes.push(ctx.view.getUint16(ctx.i));
      ctx.i += 2;
    }
    return String.fromCharCode.apply(null, codes);
  }
};
const encoder = /* @__PURE__ */ new TextEncoder();
const decoder = /* @__PURE__ */ new TextDecoder();
const utf8 = {
  encode(ctx, data) {
    ctx.i += encoder.encodeInto(data, ctx.bytes.subarray(ctx.i)).written;
  },
  decode(ctx, end) {
    return decoder.decode(ctx.bytes.subarray(ctx.i, ctx.i = end));
  }
};
const utf8js = {
  encode(ctx, data) {
    const { length } = data;
    for (let i = 0; i < length; i++) {
      const code = data.charCodeAt(i);
      if (code < 128) {
        ctx.view.setUint8(ctx.i, code);
        ctx.i++;
      } else if (code < 2048) {
        const a = (code & 1984) << 2;
        const b = code & 63;
        ctx.view.setUint16(ctx.i, a | b | 49280);
        ctx.i += 2;
      } else if (code < 55296 || code >= 57344) {
        const a = (code & 61440) << 12;
        const b = (code & 4032) << 10;
        const c = (code & 63) << 8;
        ctx.view.setUint32(ctx.i, a | b | c | 3766517760);
        ctx.i += 3;
      } else {
        const code2 = data.codePointAt(i++);
        const a = (code2 & 1835008) << 6;
        const b = (code2 & 258048) << 4;
        const c = (code2 & 4032) << 2;
        const d = code2 & 63;
        ctx.view.setUint32(ctx.i, a | b | c | d | 4034953344);
        ctx.i += 4;
      }
    }
  },
  decode(ctx, end) {
    const codes = [];
    while (ctx.i < end) {
      const s = ctx.view.getUint8(ctx.i);
      if (s < 192) {
        codes.push(s);
        ctx.i++;
      } else if (s < 224) {
        const b = ctx.view.getUint8(ctx.i + 1);
        ctx.i += 2;
        codes.push((s & 31) << 6 | b & 63);
      } else if (s < 240) {
        const b = ctx.view.getUint8(ctx.i + 1);
        const c = ctx.view.getUint8(ctx.i + 2);
        ctx.i += 3;
        codes.push((s & 15) << 12 | (b & 63) << 6 | c & 63);
      } else {
        const u = ctx.view.getUint32(ctx.i);
        const a = (s & 7) << 18;
        const b = (u & 4128768) >> 4;
        const c = (u & 16128) >> 2;
        const d = u & 63;
        codes.push(a | b | c | d);
        ctx.i += 4;
      }
    }
    return String.fromCodePoint.apply(null, codes);
  }
};
const array = (typer, header) => ({
  encode(ctx, data) {
    const { length } = data;
    header.encode(ctx, length);
    for (let i = 0; i < length; i++) {
      typer.encode(ctx, data[i]);
    }
  },
  decode(ctx) {
    const length = header.decode(ctx);
    const data = [];
    for (let i = 0; i < length; i++) {
      data.push(typer.decode(ctx));
    }
    return data;
  }
});
const uint8 = {
  encode(ctx, data) {
    ctx.view.setUint8(ctx.i++, data);
  },
  decode(ctx) {
    return ctx.view.getUint8(ctx.i++);
  }
};
const uint16 = {
  encode(ctx, data) {
    ctx.view.setUint16(ctx.i, data);
    ctx.i += 2;
  },
  decode(ctx) {
    const data = ctx.view.getUint16(ctx.i);
    ctx.i += 2;
    return data;
  }
};
const uint32 = {
  encode(ctx, data) {
    ctx.view.setUint32(ctx.i, data);
    ctx.i += 4;
  },
  decode(ctx) {
    const data = ctx.view.getUint32(ctx.i);
    ctx.i += 4;
    return data;
  }
};
const bigUint64 = {
  encode(ctx, data) {
    ctx.view.setBigUint64(ctx.i, data);
    ctx.i += 8;
  },
  decode(ctx) {
    const data = ctx.view.getBigUint64(ctx.i);
    ctx.i += 8;
    return data;
  }
};
const int8 = {
  encode(ctx, data) {
    ctx.view.setInt8(ctx.i++, data);
  },
  decode(ctx) {
    return ctx.view.getInt8(ctx.i++);
  }
};
const int16 = {
  encode(ctx, data) {
    ctx.view.setInt16(ctx.i, data);
    ctx.i += 2;
  },
  decode(ctx) {
    const data = ctx.view.getInt16(ctx.i);
    ctx.i += 2;
    return data;
  }
};
const int32 = {
  encode(ctx, data) {
    ctx.view.setInt32(ctx.i, data);
    ctx.i += 4;
  },
  decode(ctx) {
    const data = ctx.view.getInt32(ctx.i);
    ctx.i += 4;
    return data;
  }
};
const bigInt64 = {
  encode(ctx, data) {
    ctx.view.setBigInt64(ctx.i, data);
    ctx.i += 8;
  },
  decode(ctx) {
    const data = ctx.view.getBigInt64(ctx.i);
    ctx.i += 8;
    return data;
  }
};
const float32 = {
  encode(ctx, data) {
    ctx.view.setFloat32(ctx.i, data);
    ctx.i += 4;
  },
  decode(ctx) {
    const data = ctx.view.getFloat32(ctx.i);
    ctx.i += 4;
    return data;
  }
};
const float64 = {
  encode(ctx, data) {
    ctx.view.setFloat64(ctx.i, data);
    ctx.i += 8;
  },
  decode(ctx) {
    const data = ctx.view.getFloat64(ctx.i);
    ctx.i += 8;
    return data;
  }
};
const mappings = {
  uint8,
  uint16,
  uint32,
  int8,
  int16,
  int32,
  float32,
  float64,
  bigUint64,
  bigInt64
};
const number = (kind, size) => mappings[`${kind}${size}`];
const optional = (typer) => ({
  encode(ctx, data) {
    if (data == void 0) {
      ctx.view.setUint8(ctx.i++, 0);
    } else {
      ctx.view.setUint8(ctx.i++, 1);
      typer.encode(ctx, data);
    }
  },
  decode(ctx) {
    if (ctx.view.getUint8(ctx.i++)) {
      return typer.decode(ctx);
    }
  }
});
const record = (typer, header, keyer) => ({
  encode(ctx, data) {
    const { length } = Object.keys(data);
    header.encode(ctx, length);
    for (const key in data) {
      keyer.encode(ctx, key);
      typer.encode(ctx, data[key]);
    }
  },
  decode(ctx) {
    const length = header.decode(ctx);
    const data = {};
    for (let i = 0; i < length; i++) {
      data[keyer.decode(ctx)] = typer.decode(ctx);
    }
    return data;
  }
});
const string = (sequencer, header) => ({
  encode(ctx, data) {
    const head = ctx.i;
    header.encode(ctx, 0);
    const begin = ctx.i;
    sequencer.encode(ctx, data);
    const end = ctx.i;
    const size = end - begin;
    ctx.i = head;
    header.encode(ctx, size);
    ctx.i = end;
  },
  decode(ctx) {
    return sequencer.decode(ctx, header.decode(ctx) + ctx.i);
  }
});
const struct = (definition) => {
  const obj = definition instanceof Array ? () => [] : () => ({});
  return {
    encode(ctx, data) {
      for (const key in definition) {
        definition[key].encode(ctx, data[key]);
      }
    },
    decode(ctx) {
      const data = obj();
      for (const key in definition) {
        data[key] = definition[key].decode(ctx);
      }
      return data;
    }
  };
};
const tuple = (...definition) => struct(definition);
const bytes = (header) => ({
  encode(ctx, data) {
    const { byteLength } = data;
    header.encode(ctx, byteLength);
    ctx.bytes.set(data, ctx.i);
    ctx.i += byteLength;
  },
  decode(ctx) {
    const byteLength = header.decode(ctx);
    return ctx.bytes.subarray(ctx.i, ctx.i += byteLength);
  }
});
const boolean = {
  encode(ctx, data) {
    ctx.view.setUint8(ctx.i++, +data);
  },
  decode(ctx) {
    return Boolean(ctx.view.getUint8(ctx.i++));
  }
};
const nameOf = (key) => /* @__PURE__ */ isNaN(+key) ? /* @__PURE__ */ JSON.stringify(key) : key;
function createStructTyper(definition, async) {
  const as = async ? "async " : "";
  const aw = async ? "await " : "";
  const keys = /* @__PURE__ */ Object.keys(definition);
  const indexes = /* @__PURE__ */ Object.keys(keys).map((i) => +i);
  const values = /* @__PURE__ */ Object.values(definition);
  return /* @__PURE__ */ new Function(`[${indexes.map((i) => "k" + i).join()}]`, `[${indexes.map((i) => "e" + i).join()}]`, `[${indexes.map((i) => "d" + i).join()}]`, `return{${as}encode(c,d){${indexes.map((i) => `${aw}e${i}(c,d[${nameOf(keys[i])}])`).join(";")}},${as}decode(c){const d=${definition instanceof Array ? "[]" : "{}"};${indexes.map((i) => `d[${nameOf(keys[i])}]=${aw}d${i}(c)`).join(";")};return d}}`)(keys, /* @__PURE__ */ values.map(({ encode }) => encode), /* @__PURE__ */ values.map(({ decode }) => decode));
}
const evalStruct = (definition) => createStructTyper(definition, false);
const evalTuple = (...definition) => evalStruct(definition);
const evalNumber = (kind, size) => {
  const name = /* @__PURE__ */ kind[0].toUpperCase() + /* @__PURE__ */ kind.slice(1) + size;
  const offset = size / 8;
  return /* @__PURE__ */ new Function(`return {encode(c,d){c.view.set${name}(c.i,d);c.i+=${offset}},decode(c){const d=c.view.get${name}(c.i);c.i+=${offset};return d}}`)();
};
const evalUint8 = evalNumber("uint", 8);
const evalUint16 = evalNumber("uint", 16);
const evalUint32 = evalNumber("uint", 32);
const evalInt8 = evalNumber("int", 8);
const evalInt16 = evalNumber("int", 16);
const evalInt32 = evalNumber("int", 32);
const evalBigUint64 = evalNumber("bigUint", 64);
const evalBigInt64 = evalNumber("bigInt", 64);
const evalFloat32 = evalNumber("float", 32);
const evalFloat64 = evalNumber("float", 64);
const asyncArray = (typer, header) => ({
  async encode(ctx, data) {
    const { length } = data;
    header.encode(ctx, length);
    for (let i = 0; i < length; i++) {
      await typer.encode(ctx, data[i]);
    }
  },
  async decode(ctx) {
    const length = header.decode(ctx);
    const data = [];
    for (let i = 0; i < length; i++) {
      data.push(await typer.decode(ctx));
    }
    return data;
  }
});
const asyncEvalStruct = (definition) => createStructTyper(definition, true);
const asyncEvalTuple = (...definition) => asyncEvalStruct(definition);
const asyncOptional = (typer) => ({
  async encode(ctx, data) {
    if (data == void 0) {
      ctx.view.setUint8(ctx.i++, 0);
    } else {
      ctx.view.setUint8(ctx.i++, 1);
      await typer.encode(ctx, data);
    }
  },
  async decode(ctx) {
    if (ctx.view.getUint8(ctx.i++)) {
      return await typer.decode(ctx);
    }
  }
});
const asyncRecord = (typer, header, keyer) => ({
  async encode(ctx, data) {
    const { length } = Object.keys(data);
    header.encode(ctx, length);
    for (const key in data) {
      keyer.encode(ctx, key);
      await typer.encode(ctx, data[key]);
    }
  },
  async decode(ctx) {
    const length = header.decode(ctx);
    const data = {};
    for (let i = 0; i < length; i++) {
      data[keyer.decode(ctx)] = await typer.decode(ctx);
    }
    return data;
  }
});
const asyncStruct = (definition) => {
  const obj = definition instanceof Array ? () => [] : () => ({});
  return {
    async encode(ctx, data) {
      for (const key in definition) {
        await definition[key].encode(ctx, data[key]);
      }
    },
    async decode(ctx) {
      const data = obj();
      for (const key in definition) {
        data[key] = await definition[key].decode(ctx);
      }
      return data;
    }
  };
};
const asyncTuple = (...defintion) => asyncStruct(defintion);
function use(type) {
  const ctx = createContext(1024);
  return {
    encode(data) {
      while (true) {
        const limit = ctx.bytes.length - 8;
        try {
          ctx.i = 0;
          type.encode(ctx, data);
          if (ctx.i < limit) {
            return ctx.bytes.subarray(0, ctx.i);
          }
        } catch (error) {
          if (ctx.i < limit) {
            throw error;
          }
        }
        growContext(ctx);
      }
    },
    decode(array2) {
      return type.decode(contextFromArray(array2));
    }
  };
}
function asyncUse(type) {
  let size = 64;
  return {
    async encode(data) {
      while (true) {
        const ctx = createContext(size);
        const limit = ctx.bytes.length - 8;
        try {
          ctx.i = 0;
          await type.encode(ctx, data);
          if (ctx.i < limit) {
            return ctx.bytes.subarray(0, ctx.i);
          }
        } catch (error) {
          if (ctx.i < limit) {
            throw error;
          }
        }
        size = ctx.i * 2;
      }
    },
    decode(array2) {
      return type.decode(contextFromArray(array2));
    }
  };
}
export { array, ascii, asyncArray, asyncEvalStruct, asyncEvalTuple, asyncOptional, asyncRecord, asyncStruct, asyncTuple, asyncUse, bigInt64, bigUint64, boolean, bytes, contextFromArray, createContext, evalBigInt64, evalBigUint64, evalFloat32, evalFloat64, evalInt16, evalInt32, evalInt8, evalNumber, evalStruct, evalTuple, evalUint16, evalUint32, evalUint8, float32, float64, growContext, int16, int32, int8, number, optional, record, string, struct, tuple, uint16, uint32, uint8, use, utf16, utf8, utf8js };
