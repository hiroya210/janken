console.log("init")

const winState = {
  myCard: "",
  opponentCard: "",
  score: 0
}

const CARDS = Object.freeze({
  SCISSORS: "scissors",
  PAPER: "paper",
  ROCK: "rock",
  LIZARD: "lizard",
  SPOCK: "spock"
})

const SCISSORS_WIN = Object.freeze({
  [CARDS.PAPER]: true,
  [CARDS.LIZARD]: true,
})

const PAPER_WIN = Object.freeze({
  [CARDS.ROCK]: true,
  [CARDS.SPOCK]: true,
})

const ROCK_WIN = Object.freeze({
  [CARDS.SCISSORS]: true,
  [CARDS.LIZARD]: true,
})

const LIZARD_WIN = Object.freeze({
  [CARDS.SPOCK]: true,
  [CARDS.PAPER]: true,
})

const SPOCK_WIN = Object.freeze({
  [CARDS.SCISSORS]: true,
  [CARDS.ROCK]: true,
})

function goToStep(event) {
  event.currentTarget.classList.remove("active");
}

function handleCardsClick(cardValue) {
  winState.myCard = cardValue;
  winState.opponentCard = initRandomOpponentCard();

  initJankenLogic();
  addScoreToDom();
}

function getRandomNumber() {
  return Math.floor(Math.random() * 5);
}

function initRandomOpponentCard() {
  const randomNum = getRandomNumber();
  const cards = Object.values(CARDS);

  return cards[randomNum];
}

function initRuleBtnEvent() {
  const btn = document.getElementById("rules-btn");
  btn.addEventListener("click", openRulesModal);

  const closeBtn = document.getElementById("close-btn");
  const overlay = document.getElementById("modal");

  closeBtn.addEventListener("click", closeRulesModal);
  overlay.addEventListener("click", closeRulesModal);

}

function openRulesModal() {
  const modal = document.getElementById("modal");
  if (modal.classList.contains("active")) {
    return;
  }
  modal.classList.add("active");
}

function closeRulesModal(event) {
  event.stopImmediatePropagation();
  const modal = document.getElementById("modal");
  modal.classList.remove("active");
}

function loadSessionStorage() {
  const isNew = window.sessionStorage.getItem('isNewOnJanken') !== 'false';
  if (isNew) {
    openRulesModal();
    window.sessionStorage.setItem('isNewOnJanken', 'false');
  }
}

function addScoreToDom() {
  const score = document.getElementById("score");
  score.textContent = winState.score;
}

function initJankenLogic() {
  const myCard = winState.myCard;
  const opponentCard = winState.opponentCard;
  let isWin = false;
  let isTie = myCard === opponentCard;
  switch (myCard) {
    case CARDS.SCISSORS:
      isWin = SCISSORS_WIN[opponentCard];
      break;
    
    case CARDS.PAPER:
      isWin = PAPER_WIN[opponentCard];
      break;

    case CARDS.ROCK:
      isWin = ROCK_WIN[opponentCard];
      break;

    case CARDS.LIZARD:
      isWin = LIZARD_WIN[opponentCard];
      break;

    case CARDS.SPOCK:
      isWin = SPOCK_WIN[opponentCard];
      break;
  }
  isWin = isWin === true || isTie;

  if (isWin) {
    if (!isTie) {
      winState.score += 1;
    }
  } else {
    console.log("You lose!")
    winState.score = 0;
  }
  console.log(winState.score)
  return { isWin, isTie };
}



document.addEventListener("DOMContentLoaded", () => {
  initRuleBtnEvent()
  loadSessionStorage()
})
