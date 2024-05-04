function checkThree(player) {
    const size = Math.sqrt(board.length); // Assuming the board is a square grid
    
    // Check horizontal lines
    for (let row = 0; row < size; row++) {
        let consecutiveCount = 0;
        for (let col = 0; col < size; col++) {
            if (board[row * size + col] === player) {
                consecutiveCount++;
                if (consecutiveCount === 3) {
                    return true; // Three consecutive tiles found horizontally
                }
            } else {
                consecutiveCount = 0;
            }
        }
    }
    
    // Check vertical lines
    for (let col = 0; col < size; col++) {
        let consecutiveCount = 0;
        for (let row = 0; row < size; row++) {
            if (board[row * size + col] === player) {
                consecutiveCount++;
                if (consecutiveCount === 3) {
                    return true; // Three consecutive tiles found vertically
                }
            } else {
                consecutiveCount = 0;
            }
        }
    }
    
    return false; // No three consecutive tiles found
}


function appendOtherPlayer(canrun) {
    if (canrun) {
        otherplayer = currentPlayer === 'Barbie' ? 'Ken' : 'Barbie';
        let ujint = foundThree(otherplayer);
        cells[ujint].innerHTML = "";
        appendNewPlayer(ujint); 
        cells[ujint].classList.add('shake');}
        currentPlayer === 'Barbie' ? powerUpBarbie = false : powerUpKen = false;
        currentPlayer === humanPlayer ? powerupHuman = false : powerupAi = false;
}

function foundThree(player) {
    let ranarray = [];
    for (let i = 0; i < board.length;i++) {
        if (board[i] === player) {
            ranarray.push(i);
        }
    }
    return ranarray[Math.floor(Math.random() * ranarray.length)];
}
