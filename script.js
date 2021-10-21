const body = document.querySelector("body");


const squareFactory = () => {
  let state = 'BLANK';
  let div = document.createElement('div');

  const setState = (newState) => {
    state = newState;
    div.textContent = newState;

    if(newState === 'BLANK'){
      div.textContent = '';
    }
  }

  const getState = () => state;

  return {setState, getState, div};
};

let square = squareFactory();

const playerFactory = () => {
    let score = 0;
    return {score};
}

const gameBoard = (() => {
    let squares = [];

    for (i = 0; i <= 8; i++){
        squares[i] = squareFactory();
        body.appendChild(squares[i].div);
    }

    return {squares};
})();

const player1 = playerFactory();
const player2 = playerFactory();

