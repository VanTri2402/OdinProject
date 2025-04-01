const arr = ["Keo", "Bua", "Bao"];
let humanScore = 0;
let computerScore = 0;
let round = 0;
let maxRound = 5;

var computerValue = () => {
  let random = Math.floor(Math.random() * 3);
  console.log("computer :", arr[random]);

  return arr[random];
};

var humanValue = () => {
  let inputValue = prompt("Nhap vao 1 trong 3 : Keo Bua Bao");
  if (arr.includes(inputValue)) {
    console.log("me : ", inputValue);
    return inputValue;
  } else {
    alert("Nhap sai yeu cau ban nhap lai");
    return humanValue();
  }
};

var playRound = (humanValue, computerValue) => {
  if (humanValue === computerValue) {
    console.log("Ban da hoa !");
  } else if (
    (humanValue === "Keo" && computerValue === "Bao") ||
    (humanValue === "Bao" && computerValue === "Bua") ||
    (humanValue === "Bua" && computerValue === "Keo")
  ) {
    console.log("Ban da thang !");
    humanScore++;
  } else {
    console.log("Ban da thua !");
    computerScore++;
  }
  round++;
};

var playGame = () => {
  for (let i = 0; i < maxRound; i++) {
    console.log(`Vòng ${round + 1}`);
    var userChoice = humanValue();
    var computerChoice = computerValue();
    playRound(userChoice, computerChoice);
  }
  if (computerScore > humanScore) {
    console.log("Ban da thua NPC!");
  } else {
    console.log("Ban da thang");
  }
  console.log("Diem cua ban :", humanScore);
  console.log("Diem cua NPC : ", computerScore);
};
playGame();
