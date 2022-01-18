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
        return ctx.bytes;
    } catch (error) {
      if (ctx.i < limit)
        throw error;
    }
    growContext(ctx);
  }
}
function contextDes(ctx, des, bytes2) {
  const { length } = bytes2;
  if (length < 4096) {
    ctx.bytes.set(bytes2);
    ctx.i = 0;
    return des(ctx);
  } else {
    return des(contextFromBytes(bytes2));
  }
}
function contextFromBytes(array2) {
  return {
    i: 0,
    bytes: array2,
    view: new DataView(array2.buffer, array2.byteOffset, array2.byteLength)
  };
}
function define(ser, des) {
  return { ser, des };
}
const latin1 = {
  encode(ctx, data) {
    const { length } = data;
    for (let i = 0; i < length; i++) {
      ctx.view.setUint8(ctx.i++, data.charCodeAt(i));
    }
  },
  decode(ctx, size) {
    const codes = new Array(size);
    for (let i = 0; i < size; i++) {
      codes[i] = ctx.view.getUint8(ctx.i++);
    }
    return String.fromCharCode(...codes);
  }
};
const ucs2 = {
  encode(ctx, data) {
    const { length } = data;
    for (let i = 0; i < length; i++) {
      ctx.view.setUint16(ctx.i, data.charCodeAt(i));
      ctx.i += 2;
    }
  },
  decode(ctx, size) {
    const length = size / 2;
    const codes = new Array(length);
    for (let i = 0; i < length; i++) {
      codes[i] = ctx.view.getUint16(ctx.i);
      ctx.i += 2;
    }
    return String.fromCharCode(...codes);
  }
};
const encoder = /* @__PURE__ */ new TextEncoder();
const decoder = /* @__PURE__ */ new TextDecoder();
const utf8 = {
  encode(ctx, data) {
    ctx.i += encoder.encodeInto(data, ctx.bytes.subarray(ctx.i)).written;
  },
  decode: (ctx, size) => decoder.decode(ctx.bytes.subarray(ctx.i, ctx.i += size))
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
  decode(ctx, size) {
    const codes = [];
    const end = ctx.i + size;
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
    return String.fromCodePoint(...codes);
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
  const data = new Array(length);
  for (let i = 0; i < length; i++) {
    data[i] = sd.des(ctx);
  }
  return data;
});
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
}, (ctx) => encoding.decode(ctx, headSd.des(ctx)));
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
function use({ ser, des }) {
  const ctx = createContext();
  return {
    ser,
    des,
    toBytes: (data) => contextSer(ctx, ser, data).slice(0, ctx.i),
    toUnsafeBytes: (data) => contextSer(ctx, ser, data).subarray(0, ctx.i),
    fromBytes: (bytes2) => contextDes(ctx, des, bytes2)
  };
}
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
export { array, bigInt64, bigUint64, boolean, bytes, contextDes, contextFromBytes, contextSer, createContext, define, float32, float64, growContext, int16, int32, int8, latin1, number, optional, record, string, struct, tuple, ucs2, uint16, uint32, uint8, use, utf8, utf8js };
