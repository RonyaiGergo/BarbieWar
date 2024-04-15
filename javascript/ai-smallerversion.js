
let empty;

let score = {
   aiPlayer : 1,
   humanPlayer : -1,
   'tie' : 0

}




function minimax(board, depth, isMaximizing) {
    const winner = checkWinner();
    if (winner !== null) {
        if (winner === aiPlayer) {
            return 10 - depth;
        } else if (winner === humanPlayer) {
            return depth - 10;
        } else {
            return 0;
        }
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = aiPlayer;
                const score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = humanPlayer;
                const score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}


function aiNextMove() {
    currentPlayer = aiPlayer;
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = aiPlayer;
            const score = minimax(board, 0, false);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    if (board[move] === '' && cells[move].innerHTML === "") {
    board[move] = aiPlayer;
    const picapp = document.createElement('img'); 
    picapp.className = 'gamepic'; 
    picapp.src = aiPlayer === 'Barbie' ? bpic : kenp; //itt csak kijelölöm hogy ha barbie van soron akkor ő ha nem akkor a másik kép lesz kijelölve
    cells[move].appendChild(picapp);
    for (cel of cells) {cel.className = "cell";}
    }
    
}

