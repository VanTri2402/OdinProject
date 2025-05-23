import { capitalize } from "../src/capitalize";
test("capitalize first letter", () => {
  expect(capitalize("hello")).toBe("Hello");
});
