import value from "./follow.js";

let errored = false;

if (value.testGroup === "a") {
  if (value.birthYear !== 2008) {
    console.log(`Correct birth year! " ${value.birthYear}"`);
    errored = true;
  }
  if (value.thisYear !== 2025) {
    console.log(`Correct this year! " ${value.thisYear}"`);
    errored = true;
  }
  if (value.firstname !== "Van Tri ") {
    console.log(`Correct firstname! " ${value.firstname}"`);
    errored = true;
  }
  if (value.lastname !== "Nguyen Huu") {
    console.log(`Correct lastname! " ${value.lastname}"`);
    errored = true;
  }
  if (value.age !== 17) {
    console.log(`Correct age! " ${value.age}"`);
    errored = true;
  }
  if (value.fullName !== "Van Tri Nguyen Huu") {
    console.log(`Correct fullName! " ${value.fullName}"`);
    errored = true;
  }
  if (
    value.info !==
    "My name is Van Tri Nguyen Huu and I am 17 years old .2025 is my birth year.2008 and my age is 17."
  ) {
    console.log(`Correct info! " ${value.info}"`);
    errored = true;
  }
}

if (value.testGroup === "b") {
  if (value.birthYear !== 2008) {
    console.log(`Correct birth year! " ${value.birthYear}"`);
    errored = true;
  }
  if (value.thisYear !== 2025) {
    console.log(`Correct this year! " ${value.thisYear}"`);
    errored = true;
  }
  if (value.firstname !== "Van Tri ") {
    console.log(`Correct firstname! " ${value.firstname}"`);
    errored = true;
  }
  if (value.lastname !== "Nguyen Huu") {
    console.log(`Correct lastname! " ${value.lastname}"`);
    errored = true;
  }
  if (value.age !== 17) {
    console.log(`Correct age! " ${value.age}"`);
    errored = true;
  }
  if (value.fullName !== "Van Tri Nguyen Huu") {
    console.log(`Correct fullName! " ${value.fullName}"`);
    errored = true;
  }
  if (
    value.info !==
    "My name is Van Tri Nguyen Huu and I am 17 years old .2025 is my birth year.2008 and my age is 17."
  ) {
    console.log(`Correct info! " ${value.info}"`);
    errored = true;
  }
}

if (!errored && values.testGroup === "a") {
  console.log("Congrats! Move onto the next step!");
} else if (errored && values.testGroup === "a") {
  console.log("Try again");
}

if (!errored && values.testGroup === "b") {
  console.log("Congrats! Move onto the next lesson!");
} else if (errored) {
  console.log("Try again");
}
console.log("\n---------------------------------\n\n");
