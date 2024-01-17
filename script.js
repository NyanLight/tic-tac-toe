const gameboard = (function () {
  let totalScore = {
    firstPlayer: 0,
    secondPlayer: 0,
  };
  let gamefield = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  function displayBoard() {
    for (row of gamefield) {
      const joined = row.join(" ");
      console.log(joined);
    }
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

  function checkDraw() {
    const emptySpots = gamefield.filter((spot) => spot.length > 0);
    if (emptySpots > 0 && !checkVictory) {
      return;
    } else {
      console.log("It's draw!");
      displayTotalScore();
    }
  }

  return { displayBoard, displayTotalScore, resetBoard, checkDraw };
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

  return { name, incrementVictories, greetings };
}

function gameController(firstPlayer, secondPlayer) {
  const marks = ["X", "0"];
  (function chooseMark() {
    if (Math.random() > 0.5) {
      firstPlayer.mark = marks[0];
      secondPlayer.mark = marks[1];
    } else {
      firstPlayer.mark = marks[1];
      secondPlayer.mark = marks[0];
    }
  })();
}
