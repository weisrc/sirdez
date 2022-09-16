import {
  array,
  boolean,
  hydra,
  string,
  struct,
  uint8,
  use,
  utf8js,
  rec,
  Serdes
} from "../../src";

class Person {
  name = "";
  age = 0;
  alive = false;
  friends: Person[] = [];
  status() {
    return `${this.name} is ${this.age} years old and is ${
      this.alive ? "alive" : "dead"
    }`;
  }
  friendsStatus() {
    return this.friends.map((f) => f.status());
  }
}

const personSd: Serdes<Person> = hydra(
  struct({
    name: string(utf8js, uint8),
    age: uint8,
    alive: boolean,
    friends: array(
      rec(() => personSd),
      uint8
    )
  }),
  () => new Person()
);

const { toBytes, fromBytes } = use(personSd);

test("hydra person should be hydrated", () => {
  const person = new Person();
  person.name = "John";
  person.age = 42;
  person.alive = true;
  const friend = new Person();
  friend.name = "Jane";
  friend.age = 40;
  friend.alive = true;
  person.friends.push(friend);
  const bytes = toBytes(person);
  const hydrated = fromBytes(bytes);
  expect(hydrated.status()).toBe("John is 42 years old and is alive");
  expect(hydrated.friendsStatus()).toEqual(["Jane is 40 years old and is alive"]);
});
