import { caesarCipher } from "../src/caesarCipher";
test("shifts lowercase correctly", () => {
  expect(caesarCipher("xyz", 3)).toBe("abc");
});
test("preserves case", () => {
  expect(caesarCipher("HeLLo", 3)).toBe("KhOOr");
});
test("preserves punctuation", () => {
  expect(caesarCipher("Hello, World!", 3)).toBe("Khoor, Zruog!");
});
