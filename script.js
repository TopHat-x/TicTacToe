const body = document.querySelector("body");


const squareFactory = () => {
  let state = 'BLANK';
  let sqDiv = document.createElement('div');
  sqDiv.classList.add('square');

  const setState = (newState) => {
    state = newState;
    sqDiv.textContent = newState;

    if(newState === 'BLANK'){
      sqDiv.textContent = '';
    }
  }

  const getState = () => state;

  return {setState, getState, sqDiv}
};

const playerFactory = (playerTeam) => {
  let score = 0;
  const getScore = () => score;
  const incScore = () => {
    score++;
  }

  const team = playerTeam;

  const makeMove = (square) => {
    square.setState(team);
  }

  return {team, getScore, incScore, makeMove};
}

const gameBoard = (() => {
  const board = document.createElement('div');
  board.classList.add('board');
  body.appendChild(board);
  let squares = [];
  let squareInd = 0;

  for (column = 1; column <= 3; column++){
    let div = document.createElement('div');
    div.classList.add('column');
    board.appendChild(div);

    for (row = 1; row <= 3; row++){
      squares.push(squareFactory());
      div.appendChild(squares[squareInd].sqDiv);
      squareInd++;
    }
  }

  return {squares};
})();

const player1 = playerFactory('X');
const player2 = playerFactory('O');

