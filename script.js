const gameboard = (function () {
  let totalScore = {
    firstPlayer: 0,
    secondPlayer: 0,
  };
  let gamefield = ["", "", "", "", "", "", "", "", ""];

  function displayBoard() {
    console.log(
      `[${gamefield[0]}] [${gamefield[1]}] [${gamefield[2]}] \n[${gamefield[3]}] [${gamefield[4]}] [${gamefield[5]}] \n[${gamefield[6]}] [${gamefield[7]}] [${gamefield[8]}]`
    );
  }

  function displayTotalScore() {
    console.log(
      `Total score is ${totalScore.firstPlayer}:${totalScore.secondPlayer}`
    );
  }

  function resetBoard() {
    for (const spot of gamefield) {
      spot = "";
    }
  }

  return { displayBoard, displayTotalScore, resetBoard};
})();

function createPlayer(name) {
  let playerName = name;
  let victories = 0;

  function incrementVictories() {
    ++victories;
  }

  function greetings() {
    console.log(`Hi, I'm ${playerName} and I've got ${victories} already`);
  }

  return { name, incrementVictories, greetings};
};
