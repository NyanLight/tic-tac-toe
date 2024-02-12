const gameboard = (function () {
  let gamefield = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ];

  const displayField = function () {
    for (let i = 0; i < gamefield.length; i++) {
      const string = gamefield[i].join("|");
      console.log(string);
    }
  };

  const cleanField = function () {
    for (let i = 0; i < gamefield.length; i++) {
      for (let j = 0; j < gamefield[i].length; j++) {
        gamefield[i][j] = "-";
      }
    }
  };

  function makeTurn(row, column, mark) {
    gamefield[row][column] = mark;
  }

  const getGamefield = () => gamefield;

  return { displayField, cleanField, makeTurn, getGamefield };
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
    console.log(`${playerOne.name} plays as ${playerOne.mark}`);
    console.log(`${playerTwo.name} plays as ${playerTwo.mark}`);
  };
  markDistribution();

  let activePlayer = playerOne.mark === marks[0] ? playerOne : playerTwo;
  const switchActivePlayer = function () {
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  };
  const getActivePlayer = () => activePlayer.name;

  const printNewRound = function () {
    gameboard.displayField();
    console.log(`${activePlayer.name}, it's your turn!`);
  };

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
    console.log(
      `${activePlayer.name}'s turn is row ${row} and column ${column}`
    );
    gameboard.makeTurn(row, column, (mark = activePlayer.mark));
    turnCounter++;
    if (checkWinner()) {
      activePlayer === playerOne
        ? playerOne.addVictory()
        : playerTwo.addVictory();
      printNewRound();
      console.log(`${activePlayer.name} is a winner! Congratulations.`);
      return "win";
    } else if (tieCheck()) {
      printNewRound();
      console.log(`It's a tie game.`);
      return "tie";
    } else {
      switchActivePlayer();
      printNewRound();
    }
  };

  printNewRound();

  return { playRound, getActivePlayer, restartGame };
};

function screenController() {
  const playerOne = createPlayer("First");
  const playerTwo = createPlayer("Second");
  const game = gameController(playerOne, playerTwo);

  const turnDiv = document.getElementById("turn");
  const boardDiv = document.getElementById("board");
  const restartBtn = document.getElementById("restartBtn");
  const resultDiv = document.getElementById("result");

  function updateScreen() {
    turnDiv.textContent = `${game.getActivePlayer()}, it's your turn!`;
    boardDiv.textContent = "";

    gameboard.getGamefield().forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.column = columnIndex;
        cellButton.dataset.row = rowIndex;
        cellButton.textContent =
          gameboard.getGamefield()[rowIndex][columnIndex];
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
      e.target.textContent !== "-"
    )
      return;

    const turn = game.playRound(clickedRow, clickerColumn);
    if (turn === "win") {
      updateScreen();
      turnDiv.textContent = '';
      resultDiv.textContent = `${
        game.getActivePlayer()
      } is a winner. Congratulations!`;
      disableButtons();
    } else if (turn === "tie") {
      updateScreen();
      turnDiv.textContent = '';
      resultDiv.textContent = `It's a tie game! Try again`;
      disableButtons();
    } else {
      updateScreen();
    }
  }

  function restartHandler() {
    game.restartGame();
    updateScreen();
    resultDiv.textContent = '';
  }

  restartBtn.addEventListener("click", restartHandler);
  boardDiv.addEventListener("click", clickHandler);

  updateScreen();
}

screenController();
