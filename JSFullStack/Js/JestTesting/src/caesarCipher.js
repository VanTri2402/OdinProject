function shiftChar(char, shift) {
  const isUpper = char === char.toUpperCase();
  const base = isUpper ? 65 : 97;
  const code = char.charCodeAt(0) - base;
  const newCode = (code + shift) % 26;
  return String.fromCharCode(base + (newCode < 0 ? newCode + 26 : newCode));
}
export function caesarCipher(str, shift) {
  return [...str]
    .map((char) => {
      if (/[a-zA-Z]/.test(char)) return shiftChar(char, shift);
      return char;
    })
    .join("");
}
