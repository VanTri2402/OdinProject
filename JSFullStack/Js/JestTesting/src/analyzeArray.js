export function analyzeArray(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return {};
  const sum = arr.reduce((a, b) => a + b, 0);
  return {
    average: sum / arr.length,
    min: Math.min(...arr),
    max: Math.max(...arr),
    length: arr.length,
  };
}
