const body = document.querySelector("body");
const bottomContainer = document.getElementById("bottom-container");
const resetButton = document.getElementById("reset-btn");
resetButton.addEventListener('click', () => gameBoard.resetGame());


const squareFactory = (index) => {
  let state = 'BLANK';
  let sqDiv = document.createElement('div');
  sqDiv.classList.add('square');
  sqDiv.setAttribute("square-ID", index)

  // When you click on the div, it makes a move based on which player is active and the ID of the square clicked on.
  sqDiv.addEventListener('click', e => gameBoard.getActivePlayer().makeMove(e.target.getAttribute("square-ID")));

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
    if(gameBoard.squares[sqID].getState() === 'BLANK' && gameBoard.getGameState() === 'ACTIVE'){
      gameBoard.squares[sqID].setState(team);
      gameBoard.winCheck(team);
      gameBoard.swapActivePlayer();
    }
  }

  return {getScore, incScore, makeMove};
}

const playerX = playerFactory('X');
const playerO = playerFactory('O');

const gameBoard = (() => {
  const board = document.getElementById("gameboard");
  board.classList.add('board');
  let squares = [];
  let squareInd = 0;
  let activePlayer = playerX;
  let gameState = 'ACTIVE';
  

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

  const winCheck = (team) => {
    console.log("winCheck");
    if(gameBoard.squares[0].getState() === team && gameBoard.squares[3].getState() === team && gameBoard.squares[6].getState() === team){
      declareWinner(team);
    } else if(gameBoard.squares[1].getState() === team && gameBoard.squares[4].getState() === team && gameBoard.squares[7].getState() === team){
      declareWinner(team);
    } else if(gameBoard.squares[2].getState() === team && gameBoard.squares[5].getState() === team && gameBoard.squares[8].getState() === team){
      declareWinner(team);
    } else if(gameBoard.squares[0].getState() === team && gameBoard.squares[1].getState() === team && gameBoard.squares[2].getState() === team){
      declareWinner(team);
    } else if(gameBoard.squares[3].getState() === team && gameBoard.squares[4].getState() === team && gameBoard.squares[5].getState() === team){
      declareWinner(team);
    } else if(gameBoard.squares[6].getState() === team && gameBoard.squares[7].getState() === team && gameBoard.squares[8].getState() === team){
      declareWinner(team);
    } else if(gameBoard.squares[0].getState() === team && gameBoard.squares[4].getState() === team && gameBoard.squares[8].getState() === team){
      declareWinner(team);
    } else if(gameBoard.squares[2].getState() === team && gameBoard.squares[4].getState() === team && gameBoard.squares[6].getState() === team){
      declareWinner(team);
    } 
  }

  const declareWinner = (team) => {
    bottomContainer.textContent = team + " wins!";
    console.log(team + " wins!");
    gameState = 'INACTIVE';
  }

  const getGameState = () => gameState;
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

    gameState = 'ACTIVE';
  }

  return{squares, winCheck, getGameState, getActivePlayer, swapActivePlayer, resetGame};
})();



