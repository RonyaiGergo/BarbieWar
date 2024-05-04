
let empty;
let maxDepth = 4;
let boardSize;
let score = {
   aiPlayer : 1,
   humanPlayer : -1,
   'tie' : 0
}


function minimax(board, depth, isMaximizing, alpha, beta) {
    const winner = checkWinner(board);
    const threetileai = checkThree(aiPlayer);
    const threetilehuman = checkThree(humanPlayer);
    if (threetileai && powerupAi) {
        return 15 - depth;
    } else if (threetilehuman && powerupHuman) {
        return depth - 15;
    }

    if (winner !== null) {
        if (winner === aiPlayer) {
            return 10 - depth;
        } else if (winner === humanPlayer) {
            return depth - 10;
        } else {
            return 0;
        }
    }

    if (depth >= maxDepth) { //heuristic evaluation
        return evaluate(board);
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < boardSize; i++) {
            if (board[i] === '') {
                board[i] = aiPlayer;
                const score = minimax(board, depth + 1, false, alpha, beta);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
                alpha = Math.max(alpha, bestScore);
                if (beta <= alpha) {
                    break; 
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < boardSize; i++) {
            if (board[i] === '') {
                board[i] = humanPlayer;
                const score = minimax(board, depth + 1, true, alpha, beta);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
                beta = Math.min(beta, bestScore);
                if (beta <= alpha) {
                    break; 
                }
            }
        }
        return bestScore;
    }
}

function aiNextMove() {
    currentPlayer = aiPlayer;
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < boardSize; i++) {
        if (board[i] === '') {
            board[i] = aiPlayer;
            const score = minimax(board, 0, false, -Infinity, Infinity);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    const emptyC = ranEmptyCell()
    if (bestScore < -30 || bestScore > 30) {
        move = emptyC;
        console.log("De most mi a faszért nem jó ez a szar: " + move)
    }
    console.log(bestScore);
    if (board[move] === '' && cells[move].innerHTML === "") {
        appendNewPlayer(move);
        if (checkThree(currentPlayer)) {
            appendOtherPlayer(powerupAi) ;   
        }
    }
}

const emptyCellCunter = function emptyCells(board) {
    var emptycells = 0;
    for (let i = 0; i < boardSize;i++) {
        if (board[i] === '') {
            emptycells++;
        }
    }
    return emptycells;
}

function ranEmptyCell() {
    let ranarray = [];
    for (let i = 0; i < boardSize;i++) {
        if (board[i] === '') {
            ranarray.push(i);
        }
    }
    return ranarray[Math.floor(Math.random() * ranarray.length)];
}
