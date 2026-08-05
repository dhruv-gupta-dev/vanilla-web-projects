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