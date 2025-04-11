let circles = document.querySelectorAll(".circle");
let humanScoreEl = document.querySelector(".number-human-score");
let computerScoreEl = document.querySelector(".number-computer-score");
let bua = document.querySelector(".Bua");
let bao = document.querySelector(".Bao");
let keo = document.querySelector(".Keo");
let resultText = document.querySelector(".background-text-footer");
let buttonReset = document.querySelector(".button-footer");
let humanScore = 0;
let computerScore = 0;
let round = 0;
let arr = ["Bua", "Keo", "Bao"];

let getComputerChoice = () => {
  let valueRandom = Math.floor(Math.random() * 3);
  console.log(valueRandom);
  return arr[valueRandom];
};
let determineWinner = (humanChoice, computerChoice) => {
  if (humanChoice === computerChoice) {
    return "Ban da Hoa";
  } else if (
    (humanChoice === "Bua" && computerChoice === "Keo") ||
    (humanChoice === "Bao" && computerChoice === "Bua") ||
    (humanChoice === "Keo" && computerChoice === "Bao")
  ) {
    round++;
    return "Ban da thang !";
  } else {
    round++;
    return "Ban da thua !";
  }
};
bua.addEventListener("click", function () {
  const computerChoice = getComputerChoice();
  let result = determineWinner("Bua", computerChoice);
  updateUI("Bua", computerChoice, result);
});
bao.addEventListener("click", function () {
  const computerChoice = getComputerChoice();
  let result = determineWinner("Bao", computerChoice);
  updateUI("Bao", computerChoice, result);
});
keo.addEventListener("click", function () {
  const computerChoice = getComputerChoice();
  let result = determineWinner("Keo", computerChoice);
  updateUI("Keo", computerChoice, result);
});
let updateUI = (humanChoice, computerChoice, result) => {
  if (result === "Ban da thang !") {
    humanScore++;
    humanScoreEl.textContent = humanScore;
  } else if (result === "Ban da thua !") {
    computerScore++;
    computerScoreEl.textContent = computerScore;
  }

  resultText.textContent = `Choice cua ban ${humanChoice} va choice cua computer ${computerChoice} , ${result} `;

  if (round >= 5) {
    resultText.textContent = ` Ket qua cuoi cung ${result} `;
  }
};
let resetButton = () => {
  buttonReset.addEventListener("click", function () {
    humanScore = 0;
    computerScore = 0;
    round = 0;
    humanScoreEl.textContent = "0";
    computerScoreEl.textContent = "0";
    resultText.textContent = "Hay chon de bat dau !";
  });
};
resetButton();
