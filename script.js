const form = document.querySelector("#myForm");

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
  data.choice = +data.choice;
  data.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  data.player1 = "X";
  data.player2 = "0";
  data.round = 0;
  data.currentPlayer = "X";
  data.gameOver = false;
};
const addEventListenerToGameBoard = (data) => {
  document.querySelectorAll(".box").forEach((box) => {
    box.addEventListener("click", (event) => {
      playMove(event.target, data);
    });
  });
};
const initializGame = (data) => {
  //initialize game vartiables
  initializeVariables(data);
  console.log(data);
  //add event listener to gameboard
};
