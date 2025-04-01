const a = Number(prompt("Enter a number: "));
const b = Number(prompt("Enter b number: "));
const c = Number(prompt("Enter c number: "));
const d = Number(prompt("Enter d number: "));
const e = Number(prompt("Enter e number: "));

let arr = [a, b, c, d, e];

for (let i = 0; i < arr.length; i++) {
  console.log(`Number ${i + 1}: ${arr[i]}`);
}
export { a, b, c, d, e };
