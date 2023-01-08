function createContext(size2 = 4096) {
  const buffer = new ArrayBuffer(size2);
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
      if (ctx.i < limit && !(error instanceof RangeError))
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
  } else {
    ctx = contextFromBytes(bytes2);
  }
  const data = des(ctx);
  if (ctx.i !== length)
    throw RangeError(
      `Expected to process ${length} bytes, processed ${ctx.i} bytes instead`
    );
  return data;
}
function contextFromBytes(array2) {
  return {
    i: 0,
    bytes: array2,
    view: new DataView(
      array2.buffer,
      array2.byteOffset,
      array2.byteLength
    )
  };
}
function define(ser, des) {
  return { ser, des };
}
function packSize(ctx, size2, a, b) {
  if (size2 < 16) {
    uint8.ser(ctx, a + size2);
  } else if (size2 < 65536) {
    uint8.ser(ctx, b);
    uint16.ser(ctx, size2);
  } else {
    uint8.ser(ctx, b + 1);
    uint32.ser(ctx, size2);
  }
}
const strSize = {
  ser(ctx, size2) {
    if (size2 < 32) {
      uint8.ser(ctx, 160 + size2);
    } else if (size2 < 256) {
      uint8.ser(ctx, 217);
      uint8.ser(ctx, size2);
    } else if (size2 < 65536) {
      uint8.ser(ctx, 218);
      uint16.ser(ctx, size2);
    } else {
      uint8.ser(ctx, 219);
      uint32.ser(ctx, size2);
    }
  }
};
function packMap(ctx, data, floatHead, float, str) {
  const keys = Object.keys(data);
  const { length } = keys;
  packSize(ctx, length, 128, 222);
  for (let i = 0; i < length; i++) {
    const key = keys[i];
    pack(ctx, key, floatHead, float, str);
    pack(ctx, data[key], floatHead, float, str);
  }
}
function unpackMapBody(ctx, size2, encoding) {
  const data = {};
  for (let i = 0; i < size2; i++) {
    data[unpack(ctx, encoding)] = unpack(ctx, encoding);
  }
  return data;
}
function unpack(ctx, encoding) {
  const byte = ctx.view.getUint8(ctx.i++);
  switch (byte) {
    case 192:
      return null;
    case 194:
      return false;
    case 195:
      return true;
    case 202:
      return float32.des(ctx);
    case 203:
      return float64.des(ctx);
    case 204:
      return uint8.des(ctx);
    case 205:
      return uint16.des(ctx);
    case 206:
      return uint32.des(ctx);
    case 207:
      return Number(bigUint64.des(ctx));
    case 208:
      return int8.des(ctx);
    case 209:
      return int16.des(ctx);
    case 210:
      return int32.des(ctx);
    case 211:
      return Number(bigInt64.des(ctx));
    case 217:
      return encoding.decode(ctx, uint8.des(ctx));
    case 218:
      return encoding.decode(ctx, uint16.des(ctx));
    case 219:
      return encoding.decode(ctx, uint32.des(ctx));
    case 220:
      return unpackArrayBody(ctx, uint16.des(ctx), encoding);
    case 221:
      return unpackArrayBody(ctx, uint32.des(ctx), encoding);
    case 222:
      return unpackMapBody(ctx, uint16.des(ctx), encoding);
    case 223:
      return unpackMapBody(ctx, uint32.des(ctx), encoding);
  }
  if (byte < 128)
    return byte;
  if (byte < 144)
    return unpackMapBody(ctx, byte - 128, encoding);
  if (byte < 160)
    return unpackArrayBody(ctx, byte - 144, encoding);
  if (byte < 192)
    return encoding.decode(ctx, byte - 160);
  if (byte >= 224)
    return byte - 256;
  throw new Error("Unsupported type");
}
function packArray(ctx, data, floatHead, float, str) {
  const { length } = data;
  packSize(ctx, length, 144, 220);
  for (let i = 0; i < length; i++) {
    pack(ctx, data[i], floatHead, float, str);
  }
}
function unpackArrayBody(ctx, size2, encoding) {
  const data = Array(size2);
  for (let i = 0; i < size2; i++) {
    data[i] = unpack(ctx, encoding);
  }
  return data;
}
const packInt = (ctx, data) => {
  if (data >= 0) {
    if (data < 128) {
      uint8.ser(ctx, data);
    } else if (data < 256) {
      uint8.ser(ctx, 204);
      uint8.ser(ctx, data);
    } else if (data < 65536) {
      uint8.ser(ctx, 205);
      uint16.ser(ctx, data);
    } else if (data < 4294967296) {
      uint8.ser(ctx, 206);
      uint32.ser(ctx, data);
    } else {
      uint8.ser(ctx, 207);
      bigUint64.ser(ctx, BigInt(data));
    }
  } else {
    if (data >= -32) {
      int8.ser(ctx, data);
    } else if (data >= -128) {
      uint8.ser(ctx, 208);
      int8.ser(ctx, data);
    } else if (data >= -32768) {
      uint8.ser(ctx, 209);
      int16.ser(ctx, data);
    } else if (data >= -2147483648) {
      uint8.ser(ctx, 210);
      int32.ser(ctx, data);
    } else {
      uint8.ser(ctx, 211);
      bigInt64.ser(ctx, BigInt(data));
    }
  }
};
function pack(ctx, data, floatHead, float, str) {
  switch (data) {
    case null:
      uint8.ser(ctx, 192);
      return;
    case false:
      uint8.ser(ctx, 194);
      return;
    case true:
      uint8.ser(ctx, 195);
      return;
  }
  switch (typeof data) {
    case "number":
      if (Number.isInteger(data)) {
        packInt(ctx, data);
      } else {
        uint8.ser(ctx, floatHead);
        float(ctx, data);
      }
      return;
    case "string":
      str(ctx, data);
      return;
    case "object":
      if (Array.isArray(data)) {
        packArray(ctx, data, floatHead, float, str);
        return;
      }
      packMap(
        ctx,
        data,
        floatHead,
        float,
        str
      );
      return;
  }
}
const msgpack = (encoding, single = false) => {
  const { ser: float } = single ? float32 : float64;
  const head = single ? 202 : 203;
  const { ser: str } = string(encoding, strSize);
  return define(
    (ctx, data) => pack(ctx, data, head, float, str),
    (ctx) => unpack(ctx, encoding)
  );
};
function use({ ser, des }, size2) {
  const ctx = createContext(size2);
  return {
    ser,
    des,
    toBytes: (data) => contextSer(ctx, ser, data).slice(0, ctx.i),
    toUnsafeBytes: (data) => contextSer(ctx, ser, data).subarray(0, ctx.i),
    fromBytes: (bytes2) => contextDes(ctx, des, bytes2)
  };
}
const latin1 = {
  encode(ctx, data) {
    const { length } = data;
    for (let i = 0; i < length; i++) {
      ctx.view.setUint8(ctx.i++, data.charCodeAt(i));
    }
  },
  decode(ctx, size2) {
    const codes = new Array(size2);
    for (let i = 0; i < size2; i++) {
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
  decode(ctx, size2) {
    const length = size2 / 2;
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
  decode: (ctx, size2) => decoder.decode(ctx.bytes.subarray(ctx.i, ctx.i += size2))
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
  decode(ctx, size2) {
    const codes = [];
    const end = ctx.i + size2;
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
        codes.push(
          (s & 15) << 12 | (b & 63) << 6 | c & 63
        );
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
const array = (sd, headSd) => define(
  (ctx, data) => {
    const { length } = data;
    headSd.ser(ctx, length);
    for (let i = 0; i < length; i++) {
      sd.ser(ctx, data[i]);
    }
  },
  (ctx) => {
    const length = headSd.des(ctx);
    const data = new Array(length);
    for (let i = 0; i < length; i++) {
      data[i] = sd.des(ctx);
    }
    return data;
  }
);
const boolean = define(
  (ctx, data) => void ctx.view.setUint8(ctx.i++, +data),
  (ctx) => !!ctx.view.getUint8(ctx.i++)
);
const bytes = (headSd) => define(
  (ctx, data) => {
    const { byteLength } = data;
    headSd.ser(ctx, byteLength);
    const { i } = ctx;
    ctx.i += byteLength;
    ctx.bytes.set(data, i);
  },
  (ctx) => {
    const byteLength = headSd.des(ctx);
    return ctx.bytes.subarray(ctx.i, ctx.i += byteLength);
  }
);
const clazz = (clazz2, sd) => ({
  clazz: clazz2,
  ser: sd.ser,
  des: (ctx) => Object.assign(new clazz2(), sd.des(ctx))
});
const map = (keySd, valueSd, headSd) => define(
  (ctx, data) => {
    const { length } = Object.keys(data);
    headSd.ser(ctx, length);
    for (const key in data) {
      keySd.ser(ctx, key);
      valueSd.ser(ctx, data[key]);
    }
  },
  (ctx) => {
    const length = headSd.des(ctx);
    const data = {};
    for (let i = 0; i < length; i++) {
      data[keySd.des(ctx)] = valueSd.des(ctx);
    }
    return data;
  }
);
const optional = (sd) => define(
  (ctx, data) => {
    if (data == void 0) {
      ctx.view.setUint8(ctx.i++, 0);
    } else {
      ctx.view.setUint8(ctx.i++, 1);
      sd.ser(ctx, data);
    }
  },
  (ctx) => ctx.view.getUint8(ctx.i++) ? sd.des(ctx) : void 0
);
const usize = define(
  (ctx, data) => {
    while (true) {
      const byte = data & 127;
      data >>= 7;
      if (data) {
        ctx.view.setUint8(ctx.i++, byte | 128);
      } else {
        ctx.view.setUint8(ctx.i++, byte);
        return;
      }
    }
  },
  (ctx) => {
    let byte, res = 0, off = 0;
    do {
      byte = ctx.view.getUint8(ctx.i++);
      res += (byte & 127) << off;
      off += 7;
    } while (byte > 127);
    return res;
  }
);
const size = define(
  (ctx, data) => usize.ser(ctx, data >= 0 ? data * 2 : data * -2 - 1),
  (ctx) => {
    const num = usize.des(ctx);
    return num & 1 ? (num + 1) / -2 : num / 2;
  }
);
const string = (encoding, headSd) => define(
  (ctx, data) => {
    const head = ctx.i;
    headSd.ser(ctx, data.length);
    const begin = ctx.i;
    const headSize = begin - head;
    encoding.encode(ctx, data);
    const end = ctx.i;
    const size2 = end - begin;
    if (size2 === data.length)
      return;
    headSd.ser(ctx, size2);
    const requiredHeadSize = ctx.i - end;
    if (headSize !== requiredHeadSize) {
      ctx.bytes.copyWithin(head + requiredHeadSize, begin, end);
    }
    ctx.i = head;
    headSd.ser(ctx, size2);
    ctx.i = end + (requiredHeadSize - headSize);
  },
  (ctx) => encoding.decode(ctx, headSd.des(ctx))
);
const rec = (sd) => define(
  (ctx, data) => sd().ser(ctx, data),
  (ctx) => sd().des(ctx)
);
class InvalidOneOfType extends Error {
  constructor(type) {
    super(`Invalid oneOf type (${type})`);
    this.type = type;
  }
}
const oneOf = (headSd, typeToSerdes) => {
  const types = Object.keys(
    typeToSerdes
  );
  const typeToInt = mapKeysToIndexes(types);
  const intToType = swapKeysAndValues(typeToInt);
  return define(
    (ctx, data) => {
      const i = typeToInt[data.type];
      headSd.ser(ctx, i);
      const serdes = typeToSerdes[data.type];
      serdes.ser(ctx, data.value);
    },
    (ctx) => {
      const i = headSd.des(ctx);
      const type = intToType[i];
      if (type === void 0) {
        throw new InvalidOneOfType(i);
      }
      const serdes = typeToSerdes[type];
      const value = serdes.des(ctx);
      return { type, value };
    }
  );
};
function mapKeysToIndexes(keys) {
  const result = {};
  for (let i = 0; i < keys.length; ++i) {
    const e = keys[i];
    result[e] = i;
  }
  return result;
}
function swapKeysAndValues(obj) {
  const result = {};
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    result[v] = k;
  }
  return result;
}
const uint8 = define(
  (ctx, data) => ctx.view.setUint8(ctx.i++, data),
  (ctx) => ctx.view.getUint8(ctx.i++)
);
const uint16 = define(
  (ctx, data) => {
    ctx.view.setUint16(ctx.i, data);
    ctx.i += 2;
  },
  (ctx) => {
    const data = ctx.view.getUint16(ctx.i);
    ctx.i += 2;
    return data;
  }
);
const uint32 = define(
  (ctx, data) => {
    ctx.view.setUint32(ctx.i, data);
    ctx.i += 4;
  },
  (ctx) => {
    const data = ctx.view.getUint32(ctx.i);
    ctx.i += 4;
    return data;
  }
);
const bigUint64 = define(
  (ctx, data) => {
    ctx.view.setBigUint64(ctx.i, data);
    ctx.i += 8;
  },
  (ctx) => {
    const data = ctx.view.getBigUint64(ctx.i);
    ctx.i += 8;
    return data;
  }
);
const int8 = define(
  (ctx, data) => ctx.view.setInt8(ctx.i++, data),
  (ctx) => ctx.view.getInt8(ctx.i++)
);
const int16 = define(
  (ctx, data) => {
    ctx.view.setInt16(ctx.i, data);
    ctx.i += 2;
  },
  (ctx) => {
    const data = ctx.view.getInt16(ctx.i);
    ctx.i += 2;
    return data;
  }
);
const int32 = define(
  (ctx, data) => {
    ctx.view.setInt32(ctx.i, data);
    ctx.i += 4;
  },
  (ctx) => {
    const data = ctx.view.getInt32(ctx.i);
    ctx.i += 4;
    return data;
  }
);
const bigInt64 = define(
  (ctx, data) => {
    ctx.view.setBigInt64(ctx.i, data);
    ctx.i += 8;
  },
  (ctx) => {
    const data = ctx.view.getBigInt64(ctx.i);
    ctx.i += 8;
    return data;
  }
);
const float32 = define(
  (ctx, data) => {
    ctx.view.setFloat32(ctx.i, data);
    ctx.i += 4;
  },
  (ctx) => {
    const data = ctx.view.getFloat32(ctx.i);
    ctx.i += 4;
    return data;
  }
);
const float64 = define(
  (ctx, data) => {
    ctx.view.setFloat64(ctx.i, data);
    ctx.i += 8;
  },
  (ctx) => {
    const data = ctx.view.getFloat64(ctx.i);
    ctx.i += 8;
    return data;
  }
);
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
  return define(
    (ctx, data) => {
      for (const key in definition) {
        definition[key].ser(ctx, data[key]);
      }
    },
    (ctx) => {
      const data = obj();
      for (const key in definition) {
        data[key] = definition[key].des(ctx);
      }
      return data;
    }
  );
};
const tuple = (...definition) => struct(definition);
export { InvalidOneOfType, array, bigInt64, bigUint64, boolean, bytes, clazz, contextDes, contextFromBytes, contextSer, createContext, define, float32, float64, growContext, int16, int32, int8, latin1, map, msgpack, number, oneOf, optional, rec, size, string, struct, tuple, ucs2, uint16, uint32, uint8, use, usize, utf8, utf8js };
