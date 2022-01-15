function createContext(size = 4096) {
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
function contextSer(ctx, ser, data) {
  while (true) {
    const limit = ctx.bytes.length - 8;
    ctx.i = 0;
    try {
      ser(ctx, data);
      if (ctx.i < limit)
        return;
    } catch (error) {
      if (ctx.i < limit)
        throw error;
    }
    growContext(ctx);
  }
}
async function asyncContextSer(ctx, ser, data) {
  while (true) {
    const limit = ctx.bytes.length - 8;
    ctx.i = 0;
    try {
      await ser(ctx, data);
      if (ctx.i < limit)
        return;
    } catch (error) {
      if (ctx.i < limit)
        throw error;
    }
    growContext(ctx);
  }
}
function contextDes(ctx, des, buf) {
  const { length } = buf;
  if (length < 4096) {
    ctx.bytes.set(buf);
    ctx.i = 0;
    return des(ctx);
  } else {
    return des(contextFromBytes(buf));
  }
}
function contextFromBytes(array2) {
  return {
    i: 0,
    bytes: array2,
    view: new DataView(array2.buffer, array2.byteOffset, array2.byteLength)
  };
}
function asyncDefine(ser, des) {
  const ctx = createContext();
  return {
    ser,
    des,
    async toBytes(data) {
      await asyncContextSer(ctx, ser, data);
      return ctx.bytes.slice(0, ctx.i);
    },
    async toTempBytes(data) {
      await asyncContextSer(ctx, ser, data);
      return ctx.bytes.subarray(0, ctx.i);
    },
    fromBytes(buf) {
      return des(contextFromBytes(buf));
    }
  };
}
function define(ser, des) {
  const ctx = createContext();
  return {
    ser,
    des,
    toBytes(data) {
      contextSer(ctx, ser, data);
      return ctx.bytes.slice(0, ctx.i);
    },
    toTempBytes(data) {
      contextSer(ctx, ser, data);
      return ctx.bytes.subarray(0, ctx.i);
    },
    fromBytes(buf) {
      return contextDes(ctx, des, buf);
    }
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
const array = (sd, headSd) => define((ctx, data) => {
  const { length } = data;
  headSd.ser(ctx, length);
  for (let i = 0; i < length; i++) {
    sd.ser(ctx, data[i]);
  }
}, (ctx) => {
  const length = headSd.des(ctx);
  const data = [];
  for (let i = 0; i < length; i++) {
    data.push(sd.des(ctx));
  }
  return data;
});
const uint8 = define((ctx, data) => ctx.view.setUint8(ctx.i++, data), (ctx) => ctx.view.getUint8(ctx.i++));
const uint16 = define((ctx, data) => {
  ctx.view.setUint16(ctx.i, data);
  ctx.i += 2;
}, (ctx) => {
  const data = ctx.view.getUint16(ctx.i);
  ctx.i += 2;
  return data;
});
const uint32 = define((ctx, data) => {
  ctx.view.setUint32(ctx.i, data);
  ctx.i += 4;
}, (ctx) => {
  const data = ctx.view.getUint32(ctx.i);
  ctx.i += 4;
  return data;
});
const bigUint64 = define((ctx, data) => {
  ctx.view.setBigUint64(ctx.i, data);
  ctx.i += 8;
}, (ctx) => {
  const data = ctx.view.getBigUint64(ctx.i);
  ctx.i += 8;
  return data;
});
const int8 = define((ctx, data) => ctx.view.setInt8(ctx.i++, data), (ctx) => ctx.view.getInt8(ctx.i++));
const int16 = define((ctx, data) => {
  ctx.view.setInt16(ctx.i, data);
  ctx.i += 2;
}, (ctx) => {
  const data = ctx.view.getInt16(ctx.i);
  ctx.i += 2;
  return data;
});
const int32 = define((ctx, data) => {
  ctx.view.setInt32(ctx.i, data);
  ctx.i += 4;
}, (ctx) => {
  const data = ctx.view.getInt32(ctx.i);
  ctx.i += 4;
  return data;
});
const bigInt64 = define((ctx, data) => {
  ctx.view.setBigInt64(ctx.i, data);
  ctx.i += 8;
}, (ctx) => {
  const data = ctx.view.getBigInt64(ctx.i);
  ctx.i += 8;
  return data;
});
const float32 = define((ctx, data) => {
  ctx.view.setFloat32(ctx.i, data);
  ctx.i += 4;
}, (ctx) => {
  const data = ctx.view.getFloat32(ctx.i);
  ctx.i += 4;
  return data;
});
const float64 = define((ctx, data) => {
  ctx.view.setFloat64(ctx.i, data);
  ctx.i += 8;
}, (ctx) => {
  const data = ctx.view.getFloat64(ctx.i);
  ctx.i += 8;
  return data;
});
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
const number = (kind, bitSize) => mappings[`${kind}${bitSize}`];
const optional = (sd) => define((ctx, data) => {
  if (data == void 0) {
    ctx.view.setUint8(ctx.i++, 0);
  } else {
    ctx.view.setUint8(ctx.i++, 1);
    sd.ser(ctx, data);
  }
}, (ctx) => ctx.view.getUint8(ctx.i++) ? sd.des(ctx) : void 0);
const record = (sd, headSd, keySd) => define((ctx, data) => {
  const { length } = Object.keys(data);
  headSd.ser(ctx, length);
  for (const key in data) {
    keySd.ser(ctx, key);
    sd.ser(ctx, data[key]);
  }
}, (ctx) => {
  const length = headSd.des(ctx);
  const data = {};
  for (let i = 0; i < length; i++) {
    data[keySd.des(ctx)] = sd.des(ctx);
  }
  return data;
});
const string = (encoding, headSd) => define((ctx, data) => {
  const head = ctx.i;
  headSd.ser(ctx, 0);
  const begin = ctx.i;
  encoding.encode(ctx, data);
  const end = ctx.i;
  const size = end - begin;
  ctx.i = head;
  headSd.ser(ctx, size);
  ctx.i = end;
}, (ctx) => encoding.decode(ctx, headSd.des(ctx) + ctx.i));
const struct = (definition) => {
  const obj = definition instanceof Array ? () => [] : () => ({});
  return define((ctx, data) => {
    for (const key in definition) {
      definition[key].ser(ctx, data[key]);
    }
  }, (ctx) => {
    const data = obj();
    for (const key in definition) {
      data[key] = definition[key].des(ctx);
    }
    return data;
  });
};
const tuple = (...definition) => struct(definition);
const bytes = (headSd) => define((ctx, data) => {
  const { byteLength } = data;
  headSd.ser(ctx, byteLength);
  ctx.bytes.set(data, ctx.i);
  ctx.i += byteLength;
}, (ctx) => {
  const byteLength = headSd.des(ctx);
  return ctx.bytes.subarray(ctx.i, ctx.i += byteLength);
});
const boolean = define((ctx, data) => void ctx.view.setUint8(ctx.i++, +data), (ctx) => !!ctx.view.getUint8(ctx.i++));
const nameOf = (key) => /* @__PURE__ */ isNaN(+key) ? /* @__PURE__ */ JSON.stringify(key) : key;
function createStructSerDes(definition, async) {
  const as = async ? "async " : "";
  const aw = async ? "await " : "";
  const keys = /* @__PURE__ */ Object.keys(definition);
  const indexes = /* @__PURE__ */ Object.keys(keys).map((i) => +i);
  const values = /* @__PURE__ */ Object.values(definition);
  return /* @__PURE__ */ new Function("d", `[${indexes.map((i) => "k" + i).join()}]`, `[${indexes.map((i) => "s" + i).join()}]`, `[${indexes.map((i) => "d" + i).join()}]`, `return d(${as}(c,d)=>{${indexes.map((i) => `${aw}s${i}(c,d[${nameOf(keys[i])}])`).join(";")}},${as}(c)=>{const d=${definition instanceof Array ? "[]" : "{}"};${indexes.map((i) => `d[${nameOf(keys[i])}]=${aw}d${i}(c)`).join(";")};return d})`)(define, keys, /* @__PURE__ */ values.map(({ ser }) => ser), /* @__PURE__ */ values.map(({ des }) => des));
}
const evalStruct = (definition) => createStructSerDes(definition, false);
const evalTuple = (...definition) => evalStruct(definition);
const evalNumber = (kind, bitSize) => {
  const name = /* @__PURE__ */ kind[0].toUpperCase() + /* @__PURE__ */ kind.slice(1) + bitSize;
  const size = bitSize / 8;
  return /* @__PURE__ */ new Function("d", `return d((c,d)=>{c.view.set${name}(c.i,d);c.i+=${size}},(c)=>{const d=c.view.get${name}(c.i);c.i+=${size};return d})`)(define);
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
const asyncArray = (sd, headSd) => asyncDefine(async (ctx, data) => {
  const { length } = data;
  headSd.ser(ctx, length);
  for (let i = 0; i < length; i++) {
    await sd.ser(ctx, data[i]);
  }
}, async (ctx) => {
  const length = headSd.des(ctx);
  const data = [];
  for (let i = 0; i < length; i++) {
    data.push(await sd.des(ctx));
  }
  return data;
});
const asyncEvalStruct = (definition) => createStructSerDes(definition, true);
const asyncEvalTuple = (...definition) => asyncEvalStruct(definition);
const asyncOptional = (sd) => asyncDefine(async (ctx, data) => {
  if (data == void 0) {
    ctx.view.setUint8(ctx.i++, 0);
  } else {
    ctx.view.setUint8(ctx.i++, 1);
    await sd.ser(ctx, data);
  }
}, async (ctx) => ctx.view.getUint8(ctx.i++) ? await sd.des(ctx) : void 0);
const asyncRecord = (sd, headSd, keySd) => asyncDefine(async (ctx, data) => {
  const { length } = Object.keys(data);
  headSd.ser(ctx, length);
  for (const key in data) {
    keySd.ser(ctx, key);
    await sd.ser(ctx, data[key]);
  }
}, async (ctx) => {
  const length = headSd.des(ctx);
  const data = {};
  for (let i = 0; i < length; i++) {
    data[keySd.des(ctx)] = await sd.des(ctx);
  }
  return data;
});
const asyncStruct = (definition) => {
  const obj = definition instanceof Array ? () => [] : () => ({});
  return asyncDefine(async (ctx, data) => {
    for (const key in definition) {
      await definition[key].ser(ctx, data[key]);
    }
  }, async (ctx) => {
    const data = obj();
    for (const key in definition) {
      data[key] = await definition[key].des(ctx);
    }
    return data;
  });
};
const asyncTuple = (...defintion) => asyncStruct(defintion);
export { array, ascii, asyncArray, asyncContextSer, asyncDefine, asyncEvalStruct, asyncEvalTuple, asyncOptional, asyncRecord, asyncStruct, asyncTuple, bigInt64, bigUint64, boolean, bytes, contextDes, contextFromBytes, contextSer, createContext, define, evalBigInt64, evalBigUint64, evalFloat32, evalFloat64, evalInt16, evalInt32, evalInt8, evalNumber, evalStruct, evalTuple, evalUint16, evalUint32, evalUint8, float32, float64, growContext, int16, int32, int8, number, optional, record, string, struct, tuple, uint16, uint32, uint8, utf16, utf8, utf8js };
