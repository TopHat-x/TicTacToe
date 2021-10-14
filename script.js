const squareFactory = () => {
    let state = 'blank';
    return {state};
};

const playerFactory = () => {
    let score = 0;
    return {score};
}

const gameBoard = (() => {
    let squares = [];

    for (i = 0; i <= 8; i++){
        squares[i] = squareFactory();
    }

    return {squares};
})();

const player1 = playerFactory();
const player2 = playerFactory();