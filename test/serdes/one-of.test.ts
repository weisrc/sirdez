import { 
  float64, 
  GetType,
  string, 
  struct, 
  uint8, 
  oneOf, 
  use, 
  utf8js, 
  InvalidOneOfType, 
  boolean 
} from "../../src";

(() => {
  const Vector = struct({
    x: float64,
    y: float64
  });

  const Nickname = string(utf8js, uint8);

  const Message = use(oneOf(uint8, {
    nickname: Nickname,
    velocity: Vector
  }));

  const messages: GetType<typeof Message>[] = [
    {
      type: "nickname",
      value: "Foo"
    },

    {
      type: "velocity",
      value: { x: 42, y: 42 }
    }
  ];

  test.each(messages)("Works", m => {
    const bytes = Message.toBytes(m);
    const decoded = Message.fromBytes(bytes);

    expect(decoded).toStrictEqual(m);
  });

  test(`Throws \`${InvalidOneOfType.name}\` when oneOf type is invalid`, () => {
    const m: GetType<typeof Message> = {
      type: "nickname",
      value: "A"
    };

    const bytes = Message.toBytes(m);

    //Replace the type header with something invalid
    bytes[0] = 42;

    try {
      Message.fromBytes(bytes);
      fail();
    }
    catch (e) {
      expect(e).toBeInstanceOf(InvalidOneOfType);
      expect((e as InvalidOneOfType).type).toBe(42);
    }
  });
})();

test("oneOf type does not depend on order of properties of the parameter object", () => {
  const serdes1 = use(oneOf(uint8, {
    a: float64,
    b: boolean,
    c: string(utf8js, uint8)
  }));

  //Shuffle properties
  const serdes2 = use(oneOf(uint8, {
    b: boolean,
    c: string(utf8js, uint8),
    a: float64
  }));

  const m: GetType<typeof serdes1> = {
    type: "a",
    value: Math.PI
  };

  const bytes1 = serdes1.toBytes(m);
  const bytes2 = serdes2.toBytes(m);

  expect(bytes1).toStrictEqual(bytes2);
});
