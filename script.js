document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const resultBox = document.getElementById('resultBox');
    const resultMessage = document.getElementById('resultMessage');
    const restartBtn = document.getElementById('restartBtn');
    const restartGameBtn = document.createElement('button'); // Create restart game button
    restartGameBtn.textContent = 'Restart Game'; // Set button text
    restartGameBtn.classList.add('restart-btn'); // Add CSS class
    restartGameBtn.addEventListener('click', restartGame); // Add event listener

    let currentPlayer = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameEnded = false;

    function render() {
        board.innerHTML = '';
        boardState.forEach((cell, index) => {
            const cellDiv = document.createElement('div');
            cellDiv.innerText = cell;
            cellDiv.classList.add('cell');
            cellDiv.addEventListener('click', () => handleCellClick(index));
            board.appendChild(cellDiv);
        });
    }

    function handleCellClick(index) {
        if (boardState[index] === '' && !gameEnded) {
            boardState[index] = currentPlayer;
            render();
            if (checkWinner()) {
                showResult(`Player ${currentPlayer} wins!`);
                gameEnded = true;
            } else if (!boardState.includes('')) {
                showResult("It's a draw!");
                gameEnded = true;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    function checkWinner() {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return winConditions.some(condition => {
            const [a, b, c] = condition;
            return boardState[a] !== '' && boardState[a] === boardState[b] && boardState[a] === boardState[c];
        });
    }

    function showResult(message) {
        resultMessage.innerText = message;
        resultBox.style.display = 'block';
        resultBox.appendChild(restartBtn); // Add New Game button
    }

    function restartGame() {
        currentPlayer = 'X';
        boardState = ['', '', '', '', '', '', '', '', ''];
        gameEnded = false;
        resultBox.style.display = 'none';
        render();
    }

    render();

    restartBtn.addEventListener('click', restartGame);
    document.querySelector('.container').appendChild(restartGameBtn); // Append Restart Game button to container
});