const gameboard = (function () {
  let gamefield = [
    ["x", "x", "x"],
    ["-", "x", "-"],
    ["x", "x", "x"],
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
  const incrementVictories = () => victories++;
  const displayVicrories = () => console.log(`${name} won ${victories} times!`);

  return { name, displayVicrories, incrementVictories };
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
      if (gameboard.getGamefield()[i][i] === activePlayer.mark) diagonalCounter++;
    }
    if (diagonalCounter === 3) diagonal = true;

    let antiCounter = 0;
    for (i = 0; i < gameboard.getGamefield().length; i++) {
      for (j = 2; j == 0; j--) {
        if (gameboard.getGamefield()[i][j] === activePlayer.mark) antiCounter++;
      }
    }
    if (antiCounter === 3) anti = true;

    if (rows === true || columns === true || diagonal === true || anti === true)
      return true;
  };

  let turnCounter = 0;
  const tieCheck = function () {
    if (turnCounter === 9) return true;
  };

  const playRound = (row, column) => {
    console.log(
      `${activePlayer.name}'s turn is row ${row} and column ${column}`
    );
    gameboard.makeTurn(row, column, mark = activePlayer.mark);
    turnCounter++;
    if (checkWinner()) {
      console.log(`${activePlayer.name} is a winner! Congratulations.`);
    } else if (tieCheck()) {
      console.log(`It's a tie game.`);
    } else {
      switchActivePlayer();
      printNewRound();
    }
  };

  printNewRound();

  return { playRound };
};

const playerOne = createPlayer(prompt("Who is the first player?"));
const playerTwo = createPlayer(prompt("Who is the second player?"));
const game = gameController(playerOne, playerTwo);
