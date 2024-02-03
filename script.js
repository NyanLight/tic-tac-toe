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
                gamefield[i][j] = '';
            }
        }
    }
    
    return {displayField, cleanField, gamefield};
})();



