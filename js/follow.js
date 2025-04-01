const fristname = "Van Tri ";
const lastname = "Nguyen Huu";
const birthYear = 2008;
const thisYear = 2025;

const age = thisYear - birthYear;
const fullName = String(fristname + lastname);

const testGroup = "a"; // or "b"
const info =
  "My name is" +
  fullName +
  " and I am " +
  age +
  " years old ." +
  thisYear +
  " is my birth year." +
  birthYear +
  " and my age is " +
  age +
  ".";
console.log(info);

export default {
  info,
  birthYear,
  thisYear,
  fristname,
  lastname,
  fullName,
  age,
  testGroup,
};
