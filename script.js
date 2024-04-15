const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

const form = document.querySelector("#myForm");
const resetGameBtn = document.querySelector("#resetBtn");

form.addEventListener("submit", (event) => {
  //prevent page from refresh
  event.preventDefault();

  //initilize form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  document.querySelector(".modal-wrapper").setAttribute("hidden", true);
  initializGame(data);
});

const initializeVariables = (data) => {
  data.choice = 0;
  data.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  data.player1 = "X";
  data.player2 = "0";
  data.round = 0;
  data.currentPlayer = "X";
  data.gameOver = false;
};

const resetDom = () => {
  document.querySelectorAll(".box").forEach((box) => {
    box.className = "box";
    box.textContent = "";
  });
};
const addEventListenerToGameBoard = (data) => {
  document.querySelectorAll(".box").forEach((box) => {
    box.addEventListener("click", (event) => {
      playMove(event.target, data);
    });
  });
  resetGameBtn.addEventListener("click", () => {
    initializeVariables(data);
    resetDom();
    adjustDom("displayTurn", `${data.player1Name}'s turn`);
  });
};
const initializGame = (data) => {
  adjustDom("displayTurn", `${data.player1Name}'s turn`);
  //initialize game vartiables
  initializeVariables(data);

  //add event listener to gameboard
  addEventListenerToGameBoard(data);
};

const playMove = (box, data) => {
  //is game over ? if game over , dont do anything
  if (data.gameOver || data.round > 8) {
    return;
  }
  //check if game box has letter in
  if (data.board[box.id] === "X" || data.board[box.id] === "O") {
    return;
  }
  //ajust the DOM for player move, and then check conditions

  data.board[box.id] = data.currentPlayer;
  box.textContent = data.currentPlayer;
  box.className = data.currentPlayer === "X" ? "box player1" : "box player2";

  //increase round number
  data.round++;

  //check and coditions
  if (endConditions(data)) {
    return;
  }
  //change player
  //change DOM and change data.currentPlayer
  changerPlayer(data);
};
const endConditions = (data) => {
  //win
  //tie
  //game still going

  if (checkWinner(data)) {
    let winTextContent =
      data.currentPlayer === "X" ? data.player1Name : data.player2Name;
    adjustDom("displayTurn", winTextContent + " has Won the game");
    return true;
  } else if (data.round === 8) {
    adjustDom("displayTurn", "DRAW");
    data.gameOver = true;
    true;
  }
  return false;
};
const checkWinner = (data) => {
  let result = false;
  winningConditions.forEach((condition) => {
    if (
      data.board[condition[0]] === data.board[condition[1]] &&
      data.board[condition[1]] === data.board[condition[2]]
    ) {
      data.gameOver = true;
      result = true;
    }
  });

  return result;
};

const adjustDom = (classname, textContent) => {
  const element = document.querySelector(`.${classname}`);
  element.textContent = textContent;
};
const changerPlayer = (data) => {
  data.currentPlayer = data.currentPlayer === "X" ? "O" : "X";
  let displayTurnText =
    data.currentPlayer === "X" ? data.player1Name : data.player2Name;
  adjustDom("displayTurn", `${displayTurnText}'s turn`);
};
