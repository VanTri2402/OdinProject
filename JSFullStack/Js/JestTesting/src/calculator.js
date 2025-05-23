export const calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  divide: (a, b) => (b !== 0 ? a / b : Infinity),
  multiply: (a, b) => a * b,
};
