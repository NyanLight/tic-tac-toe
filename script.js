const gameboard = (function () {
  let gamefield = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const cleanField = function () {
    for (let i = 0; i < gamefield.length; i++) {
      for (let j = 0; j < gamefield[i].length; j++) {
        gamefield[i][j] = "";
      }
    }
  };

  function makeTurn(row, column, mark) {
    gamefield[row][column] = mark;
  }

  const getGamefield = () => gamefield;

  return {cleanField, makeTurn, getGamefield };
})();

function createPlayer(name) {
  let victories = 0;
  const addVictory = () => victories++;
  const getVicrories = () => victories;

  return { name, getVicrories, addVictory };
}

const gameController = function (playerOne, playerTwo) {
  const marks = ["x", "o"];
  const markDistribution = function () {
    if (Math.random() >= 0.5) {
      playerOne.mark = marks[0];
      playerTwo.mark = marks[1];
    } else {
      playerOne.mark = marks[1];
      playerTwo.mark = marks[0];
    }
  };
  markDistribution();

  let activePlayer = playerOne.mark === marks[0] ? playerOne : playerTwo;
  const switchActivePlayer = function () {
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  };
  const getActivePlayer = () => activePlayer.name;
  
  const checkWinner = function () {
    let rows, columns, diagonal, anti;

    for (let i = 0; i < gameboard.getGamefield().length; i++) {
      let row = 0;
      for (let j = 0; j < gameboard.getGamefield()[i].length; j++) {
        if (gameboard.getGamefield()[i][j] == activePlayer.mark) row++;
      }
      if (row === 3) {
        rows = true;
        break;
      }
    }

    for (j = 0; j < gameboard.getGamefield().length; j++) {
      let column = 0;
      for (i = 0; i < gameboard.getGamefield().length; i++) {
        if (gameboard.getGamefield()[i][j] == activePlayer.mark) column++;
      }
      if (column === 3) {
        columns = true;
        break;
      }
    }

    let diagonalCounter = 0;
    for (i = 0; i < gameboard.getGamefield().length; i++) {
      if (gameboard.getGamefield()[i][i] === activePlayer.mark)
        diagonalCounter++;
    }
    if (diagonalCounter === 3) diagonal = true;

    let antiCounter = 0;
    j = 2;
    for (i = 0; i < gameboard.getGamefield().length; i++) {
      if (gameboard.getGamefield()[i][j] === activePlayer.mark) antiCounter++;
      j--;
    }
    if (antiCounter === 3) anti = true;

    if (rows === true || columns === true || diagonal === true || anti === true)
      return true;
  };

  let turnCounter = 0;
  const tieCheck = function () {
    if (turnCounter === 9) return true;
  };

  const restartGame = function () {
    markDistribution();
    activePlayer = playerOne.mark === marks[0] ? playerOne : playerTwo;
    gameboard.cleanField();
    turnCounter = 0;
  };

  const playRound = (row, column) => {
    gameboard.makeTurn(row, column, (mark = activePlayer.mark));
    turnCounter++;
    if (checkWinner()) {
      activePlayer === playerOne
        ? playerOne.addVictory()
        : playerTwo.addVictory();
      return "win";
    } else if (tieCheck()) {
      return "tie";
    } else {
      switchActivePlayer();
    }
  };


  return { playRound, getActivePlayer, restartGame };
};

function screenController() {
  let playerOne = createPlayer(prompt('Who is the first player?'));
  if (!playerOne.name) playerOne.name = 'Kitty';
  let playerTwo = createPlayer(prompt('Who is the second player?'));
  if (!playerTwo.name) playerTwo.name = 'Patch';
  const game = gameController(playerOne, playerTwo);

  const turnDiv = document.getElementById("turn");
  const boardDiv = document.getElementById("board");
  const restartBtn = document.getElementById("restart");
  const scoreDiv = document.getElementById('score');

  function updateScreen() {
    turnDiv.textContent = `${game.getActivePlayer()}, it's your turn!`;
    boardDiv.textContent = "";
    scoreDiv.textContent = `${playerOne.getVicrories()} : ${playerTwo.getVicrories()}`

    gameboard.getGamefield().forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.column = columnIndex;
        cellButton.dataset.row = rowIndex;
        const target = gameboard.getGamefield()[rowIndex][columnIndex];
        if (target === 'x') {
          const kitty = document.createElement('img');
          kitty.classList.add('icon');
          kitty.src = './media/brand-hello-kitty-svgrepo-com.svg';
          cellButton.appendChild(kitty);
        } else if (target === 'o') {
          const patch = document.createElement('img');
          patch.classList.add('icon');
          patch.src = './media/patch-svgrepo-com.svg';
          cellButton.appendChild(patch);
        } 
        boardDiv.appendChild(cellButton);
      });
    });
  }

  function disableButtons() {
    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
      cells[i].disabled = true;
    }
  }

  function clickHandler(e) {
    const clickedRow = e.target.dataset.row;
    const clickerColumn = e.target.dataset.column;
    if (
      !e.target.dataset.row ||
      !e.target.dataset.column ||
      e.target.textContent !== ""
    )
      return;

    const turn = game.playRound(clickedRow, clickerColumn);
    if (turn === "win") {
      updateScreen();
      turnDiv.textContent = `${
        game.getActivePlayer()
      } is a winner. Congratulations!`;
      disableButtons();
    } else if (turn === "tie") {
      updateScreen();
      turnDiv.textContent = `It's a tie game! Try again`;
      disableButtons();
    } else {
      updateScreen();
    }
  }

  function restartHandler() {
    game.restartGame();
    updateScreen();
  }

  restartBtn.addEventListener("click", restartHandler);
  boardDiv.addEventListener("click", clickHandler);

  updateScreen();
}

screenController();
