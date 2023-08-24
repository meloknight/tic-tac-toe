const boardTile = document.querySelectorAll(".board-tile");
const newGameButton = document.querySelector("#new-game-button");
const drawButton = document.querySelector("#draw-button");
const setupForm = document.querySelector("#setup-form");
const closeModalButton = document.querySelector(".close");
const modal = document.querySelector(".modal");
const drawDisplay = document.querySelector("#draw-section");

const player1Section = document.querySelector("#player-1-section");
const player1NameDiv = document.querySelector(".player1-name");
const player1SymbolDiv = document.querySelector(".player1-symbol");
const player1WinsDiv = document.querySelector(".player1-wins");

const player2Section = document.querySelector("#player-2-section");
const player2NameDiv = document.querySelector(".player2-name");
const player2SymbolDiv = document.querySelector(".player2-symbol");
const player2WinsDiv = document.querySelector(".player2-wins");

// let turnCounter = 0;
let playerTurn;
let winner = "";

let player1Wins = 0;
let player1Name = "Player 1";
let player1Symbol = "X";
let colorSelector1 = "blue";
// let player1Turn = false;

let player2Wins = 0;
let player2Name = "Player 2";
let player2Symbol = "O";
let colorSelector2 = "red";
// let player2Turn = false;

randomizeFirstPlayer();
let playerDraws = 0;

let gameboardPositions = ["", "", "", "", "", "", "", "", ""];

updateScreen();

// IDEA: HAVE A LOADUP ANIMATION ACROSS THE BOARD WHEN STARTING UP OR RESETTING

// Belongs to Gameboard

// MODAL STUFF

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

function clearModal(event) {
  const allInputs = document.querySelectorAll("input");
  allInputs.forEach((singleInput) => (singleInput.value = ""));
}

newGameButton.addEventListener("click", openModal);

setupForm.addEventListener("submit", function (event) {
  event.preventDefault();

  player1Name = document.getElementById("player1-name-input").value;
  player1Symbol = document.getElementById("player1-symbol-input").value;
  colorSelector1 = document.getElementById("color-selector1").value;

  player2Name = document.getElementById("player2-name-input").value;
  player2Symbol = document.getElementById("player2-symbol-input").value;
  colorSelector2 = document.getElementById("color-selector2").value;

  closeModal();
  clearModal();
  playerDraws = 0;
  updateScreen();
});

closeModalButton.addEventListener("click", closeModal);

// Call a draw
drawButton.addEventListener("click", resetBoardAndDraw);

function resetBoardAndDraw() {
  gameboardPositions = ["", "", "", "", "", "", "", "", ""];
  playerDraws++;
  randomizeFirstPlayer();
  updateScreen();
}

function gameOver() {
  gameboardPositions = ["", "", "", "", "", "", "", "", ""];
  randomizeFirstPlayer();
  updateScreen();
}

function updateScreen() {
  boardTile.forEach((tile) => {
    tile.textContent = gameboardPositions[tile.dataset.tile - 1];
  });
  drawDisplay.textContent = `draws: ${playerDraws}`;

  player1NameDiv.textContent = `${player1Name}`;
  player1SymbolDiv.textContent = `Player Symbol: ${player1Symbol}`;
  player1WinsDiv.textContent = `Wins: ${player1Wins}`;
  player1Section.style.background = `${colorSelector1}`;
  if (playerTurn === 1) {
    player1Section.style.border = `8px solid black`;
    player2Section.style.border = `none`;
  }

  player2NameDiv.textContent = `${player2Name}`;
  player2SymbolDiv.textContent = `Player Symbol: ${player2Symbol}`;
  player2WinsDiv.textContent = `Wins: ${player2Wins}`;
  player2Section.style.background = `${colorSelector2}`;
  if (playerTurn === 2) {
    player2Section.style.border = `8px solid black`;
    player1Section.style.border = `none`;
  }
}

function randomizeFirstPlayer() {
  let decider = Math.random();
  if (decider < 0.5) {
    playerTurn = 1;
  } else {
    playerTurn = 2;
  }
}

// Belongs to Logic
const checkGameOver = () => {
  let tileSymbol;
  if (playerTurn === 1) {
    tileSymbol = player1Symbol;
  } else {
    tileSymbol = player2Symbol;
  }
  // console.log(`Currently, ${tileSymbol} is in play!`);
  if (gameboardPositions[0] === tileSymbol) {
    if (
      gameboardPositions[1] === tileSymbol &&
      gameboardPositions[2] === tileSymbol
    ) {
      return tileSymbol;
    }
    if (
      gameboardPositions[3] === tileSymbol &&
      gameboardPositions[6] === tileSymbol
    ) {
      return tileSymbol;
    }
    if (
      gameboardPositions[4] === tileSymbol &&
      gameboardPositions[8] === tileSymbol
    ) {
      return tileSymbol;
    }
  }

  if (gameboardPositions[1] === tileSymbol) {
    if (
      gameboardPositions[4] === tileSymbol &&
      gameboardPositions[7] === tileSymbol
    ) {
      return tileSymbol;
    }
  }

  if (gameboardPositions[2] === tileSymbol) {
    if (
      gameboardPositions[4] === tileSymbol &&
      gameboardPositions[6] === tileSymbol
    ) {
      return tileSymbol;
    }
    if (
      gameboardPositions[5] === tileSymbol &&
      gameboardPositions[8] === tileSymbol
    ) {
      return tileSymbol;
    }
  }

  if (gameboardPositions[3] === tileSymbol) {
    if (
      gameboardPositions[4] === tileSymbol &&
      gameboardPositions[5] === tileSymbol
    ) {
      return tileSymbol;
    }
  }

  if (gameboardPositions[6] === tileSymbol) {
    if (
      gameboardPositions[7] === tileSymbol &&
      gameboardPositions[8] === tileSymbol
    ) {
      return tileSymbol;
    }
  }

  return "";
};

// CHANGES TURNS AND LOGS THE WINNER
boardTile.forEach((tile) => {
  tile.addEventListener("click", function () {
    if (tile.textContent === "") {
      if (playerTurn === 1) {
        gameboardPositions[tile.dataset.tile - 1] = `${player1Symbol}`;
        winner = checkGameOver();
        playerTurn = 2;
      } else {
        gameboardPositions[tile.dataset.tile - 1] = `${player2Symbol}`;
        winner = checkGameOver();
        playerTurn = 1;
      }
    }
    updateScreen();
    if (winner === player1Symbol) {
      alert(`${player1Name} is the winner!`);
      player1Wins++;
      gameOver();
    }
    if (winner === player2Symbol) {
      alert(`${player2Name} is the winner!`);
      player2Wins++;
      gameOver();
    }
  });
  // tile.textContent = gameboardPositions[tile.dataset.tile - 1];
});

// MODULES AND FACTORY FUNCTION FOR LATER USE

// Gameboard Module
// PURPOSE: Update the gameboard DOM
const gameboard = (() => {
  // const hello = (name) => `Hello, ${name}!!!`
  return {
    // gameboardPositions,
    // updateBoard,
  };
})();

// Player Factory
// PURPOSE: Create the players, track scores, symbols, etc.
const player = (name) => {
  const playerTurn = false;

  // const setPlayerName = () => {
  //     const playerName = prompt("What is your name, Player?: ")
  //     return playerName;
  // }

  const sayHello = () => console.log(`Hello, ${name}!!!`);

  return {
    // name,
    sayHello,
    // setPlayerName,
    playerTurn,
  };
};
const player1 = player("Player 1");
const player2 = player("Player 2");
// console.log(jeff.name);
// jeff.setPlayerName()
// jeff.sayHello();

// Game Logic Module
// PURPOSE: Calculate what happens when a player makes a move and determine when a player wins
const gameLogic = (() => {
  // const hello = (name) => `Hello, ${name}!!!`
  // const updateBoard = gameboard.updateBoard();
  return {
    // updateBoard,
  };
})();
