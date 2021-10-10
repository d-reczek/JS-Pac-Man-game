const rockDiv = document.querySelector(".rock");
const paperDiv = document.querySelector(".paper");
const scissorsDiv = document.querySelector(".scissors");
let userChoice = "";
let computerChoice = "";

rockDiv.addEventListener("click", () => {
  userChoice = getUserChoiceItem("rock");
  computerChoice = getComputerChoice();
  console.log("user", userChoice);
  console.log("comp", computerChoice);
  compare();
});

paperDiv.addEventListener("click", () => {
  userChoice = getUserChoiceItem("paper");
  computerChoice = getComputerChoice();
  console.log("user", userChoice);
  console.log("comp", computerChoice);
  compare();
});
scissorsDiv.addEventListener("click", () => {
  userChoice = getUserChoiceItem("scissors");
  computerChoice = getComputerChoice();
  console.log("user", userChoice);
  console.log("comp", computerChoice);
  compare();
});

function getUserChoiceItem(myChoice) {
  // console.log("user", myChoice);
  return myChoice;
}
function compare() {
  if (userChoice === "rock" && computerChoice === "paper") {
    console.log("user", userChoice);
    console.log("comp", computerChoice);
    console.log("wygrana");
  }
  if (userChoice === "rock" && computerChoice === "scissors") {
    console.log("wygrana");
  }
  if (userChoice === "rock" && computerChoice === "rock") {
    console.log("remis");
  }
  if (userChoice === "paper" && computerChoice === "rock") {
    console.log("wygrana");
  }
  if (userChoice === "paper" && computerChoice === "scissors") {
    console.log("wygrana");
  }
  if (userChoice === "paper" && computerChoice === "paper") {
    console.log("remis");
  }
  if (userChoice === "scissors" && computerChoice === "paper") {
    console.log("wygrana");
  }
  if (userChoice === "scissors" && computerChoice === "rock") {
    console.log("przegrana");
  }
  if (userChoice === "scissors" && computerChoice === "scissors") {
    console.log("remis");
  }
}

// function computerChoiceItem(compChoice) {
//   console.log("comp", compChoice);
//   return compChoice;
// }

function getComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3);
  // console.log(randomNumber);
  if (randomNumber === 0) {
    return "rock";
  }
  if (randomNumber === 1) {
    return "paper";
  }
  if (randomNumber === 2) {
    return "scissors";
  }
}

// computerChoice();

// function compare(comaprison) {
//   console.log("uruchomiona");
//   if (userChoice() === "rock" && computerChoice() === "rock") {
//     console.log("remis");
//   } else {
//     console.log("blad");
//   }
// }

// compare();
