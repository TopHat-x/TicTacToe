const body = document.querySelector("body");


const squareFactory = (index) => {
  let state = 'BLANK';
  let sqDiv = document.createElement('div');
  sqDiv.classList.add('square');
  sqDiv.setAttribute("square-ID", index)

  // When you click on the div, it makes a move based on which player is active and the ID of the square clicked on.
  sqDiv.addEventListener('click', e => gameController.getActivePlayer().makeMove(e.target.getAttribute("square-ID")));

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

  const makeMove = (sqID) => {
    if(gameBoard.squares[sqID].getState() === 'BLANK'){
      gameBoard.squares[sqID].setState(team);
      gameController.swapActivePlayer();
    }
  }

  return {getScore, incScore, makeMove};
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
      squares.push(squareFactory(squareInd));
      div.appendChild(squares[squareInd].sqDiv);
      squareInd++;
    }
  }

  return {squares};
})();

const playerX = playerFactory('X');
const playerO = playerFactory('O');

const gameController = (() => {
  let activePlayer = playerX;
  const getActivePlayer = () => activePlayer;

  const swapActivePlayer = () => {
    if (activePlayer === playerX){
      activePlayer = playerO;
    } else {
      activePlayer = playerX;
    }
  }

  const resetGame = () => {
    for (id = 0; id <= 8; id++){
      gameBoard.squares[id].setState('BLANK');
    }
  }

  return{getActivePlayer, swapActivePlayer, resetGame};
})();


