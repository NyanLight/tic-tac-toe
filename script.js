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

   const getGamefield = () => gamefield;
    
    return {displayField, cleanField, makeTurn, getGamefield};
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


    const checkWinner = function() {
        let rows, columns, diagonal, anti;

        for (let i = 0; i < getGamefield().length; i++) {
            let row = 0; 
            for (let j = 0; j < getGamefield()[i].length; j++) {
                if (getGamefield()[i][j] == activePlayer.mark) () => row++; 
            }
            if (row === 3) {
                rows = true;
                break;
            };
        }

        for (j = 0; j < getGamefield().length; j++) {
            let column = 0;
            for (i = 0; i < getGamefield()[i][j].length; i++) {
                if (getGamefield()[i][j] == activePlayer.mark) () => column++; 
            }
            if (column === 3) {
                columns = true;
                break;
            }
        }
    }
} 

