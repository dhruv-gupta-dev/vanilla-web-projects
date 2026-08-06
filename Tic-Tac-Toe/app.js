let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;
let winnningLine = null;


const boardE1 = document.getElementById('board');
const statusE1 = document.getElementById('status');
const reset_btn = document.getElementById('reset_btn');
const cellEls = document.querySelector('.cell');



function render(){
    board.forEach((value,index)=>{
        const cellE1 = cellE1s[index];
        cellE1.textContent = value ?? '';
        cellE1.disabled = value !== null || !gameActive;
        cellE1.classList.toggle('x', value === 'X');
        cellE1.classList.toggle('o', value === 'O');
        cellE1.classList.toggle('winningLine', winnningLine?.includes(index)?? false);
    });

    // statusE1.textContent = gameActive ? `Player &{currentPlayer}'s turn` : statusE1.textContent;
    if (gameActive) {
        statusEl.textContent = `Player ${currentPlayer}'s turn`;
    }
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
    const result = checkWinner(board);

    if(result){
        gameActive = false;
        winnningLine = result.line;
        statusE1.textContent = `Player ${result.winner} wins!`;
    }
    else if(checkDraw(board)){
        statusE1.textContent = `It's a draw!`;
    }
    else{
    currentPlayer = currentPlayer === 'X'? 'O': 'X';
    }
    render();
}


function resetGame(){
    board = Array(9).fil(null);
    currentPlayer = 'X';
    gameActive = true;
    winnningLine = null;
    render();
}

const WIN_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];


function checkWinner(board){
    for(const pattern of WIN_PATTERNS){
        const [a,b,c] = pattern;
        if(board[a] & board[a] === board[b] && board[a] === board[c]){
            return { 
                winner: board[a],
                line: pattern
            };
        } 
    }
    return null;
}

function checkDraw(board){
    return board.every(cell => cell !== null);
}

