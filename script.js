const gameboard = (function () {
    
    let gamefield = [
        ['-', '-', '-',],
        ['-', '-', '-',],
        ['-', '-', '-',],
    ];

    const displayField = function () {
        for (let i = 0; i < gamefield.length; i++) {
            const string = gamefield[i].join('|');
            console.log(string); 
        }
    }

    const cleanField = function () {
        for (let i = 0; i < gamefield.length; i++) {
            for (let j = 0; j < gamefield[i].length; j++) {
                gamefield[i][j] = '-';
            }
        }
    }

   function makeTurn (row, column) {
    gamefield[row][column] = activePlayer.mark;
   }
    
    return {displayField, cleanField, makeTurn, gamefield};
})();

function createPlayer (name) {
    let victories = 0;
    const incrementVictories = () => victories++;
    const displayVicrories = () => console.log(`${name} won ${victories} times!`);

    return {name, displayVicrories, incrementVictories}; 
}

const gameController = function (playerOne, playerTwo) {

    const marks = ['x', 'o'];
    const markDistribution = function() {
        if (Math.random() >= 0.5) {
            playerOne.mark = marks[0];
            playerTwo.mark = marks[1];
        } else {
            playerOne.mark = marks[1];
            playerTwo.mark = marks[0];
        }
        console.log(`${playerOne} plays as ${playerOne.mark}`)
        console.log(`${playerTwo} plays as ${playerTwo.mark}`)
    }

    let activePlayer = playerOne.mark === marks[0]? playerOne: playerTwo; 
    const switchActivePlayer = function() {
        activePlayer = activePlayer === playerOne? playerTwo: playerOne;
    };

    const printNewRound = function() {
        gameboard.displayField();
        console.log(`${activePlayer}, it's your turn!`);
    };
} 

