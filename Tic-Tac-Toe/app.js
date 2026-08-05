let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

const boardE1 = document.getElementById('board');
const statusE1 = document.getElementById('status');
const reset_btn = document.getElementById('reset_btn');
const cellEls = document.querySelector('.cell');

function render(){
    board.forEach((value,index)=>{
        const cellE1 = cellE1s[index];
        cellE1.textContent = value ?? '';
        cellE1.disabled = value !== null || !gameActive;
    });

    statusE1.textContent = gameActive ? `Player &{currentPlayer}'s turn` : statusE1.textContent;
}

render();


boardE1.addEventListener('click',handleCellClick);
reset_btn.addEventListener('click',resetGame);

function handleCellClick(event){
    const clickedCell = event.target.closest('.cell');
    if(!clickedCell) return;

    const index = Number(clickedCell.dataset.index);

    if(!gameActive || board[index] !== null) return;

    board[index] = currentPlayer;
    currentPlayer = currentPlayer === 'X'? 'O': 'X';

    render();
}

function resetGame(){
    board = Array(9).fil(null);
    currentPlayer = 'X';
    gameActive = true;
    render();
}

