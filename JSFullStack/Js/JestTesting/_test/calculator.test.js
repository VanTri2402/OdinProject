import { calculator } from "../src/calculator";

test("add correctly", () => {
  expect(calculator.add(2, 3)).toBe(5);
});
test("subtracts correctly", () => {
  expect(calculator.subtract(5, 2)).toBe(3);
});
test("divides correctly", () => {
  expect(calculator.divide(6, 3)).toBe(2);
});
test("multiplies correctly", () => {
  expect(calculator.multiply(2, 4)).toBe(8);
});

test("divide by zero returns Infinity", () => {
  expect(calculator.divide(4, 0)).toBe(Infinity);
});
