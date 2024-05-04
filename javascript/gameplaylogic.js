/*
A gameplaylogic a játékhoz tartozó logikákat tartalmazza
*/
let currentPlayer;
let playerOne;
let playerTwo;
let humanPlayer;
let aiPlayer;
let powerUpBarbie = true;
let powerUpKen = true;
let powerupAi = true;
let powerupHuman = true;
const kenp = document.getElementById('kenpic').src;
const bpic = document.getElementById('barbiepic').src; 
const message = document.getElementById('mess'); 

function appendNewPlayer(num) {
    board[num] = currentPlayer;
    const picapp = document.createElement('img'); 
    picapp.className = 'gamepic'; 
    picapp.src = currentPlayer === 'Barbie' ? bpic : kenp;
    cells[num].appendChild(picapp); 
    cells[num].classList.add('cellalter');
}

function makeMove(index) {
    for (cel of cells) {cel.classList.remove('shake');}
    let mehet = !checkWinner() && running && checkFilled();
    let ugyanaz = cells[index].innerHTML === "" ? false : true;

    if (mehet && !ugyanaz) { 
        counter(secundDisplay);
        appendNewPlayer(index);
       if (aiChoosen && mehet) {
        if (checkThree(currentPlayer)) {
            appendOtherPlayer(powerupHuman) ;   
        } 
        aiNextMove();
        currentPlayer = humanPlayer;
        playSoundEffect(currentPlayer);
        boardColorChanger(); 
        }
    }

        if (!checkFilled() && !checkWinner()) {
            gameEnded();
            message.textContent = "Stalemate losers!";
        } 
        else if (checkWinner()) { 
            message.textContent = `${currentPlayer === 'Barbie' ? `${barbieName} finished him!` : `${kenName} finished her!`}`;
            winner = currentPlayer
            updateScore(currentPlayer);
            gameEnded();
            randomEndSound(winner);
        }
        else if (running == true && checkFilled() && !ugyanaz && !aiChoosen){
            if (checkThree(currentPlayer)) {
                appendOtherPlayer((currentPlayer === 'Barbie' && powerUpBarbie) || (currentPlayer === 'Ken' && powerUpKen)) ;         
            } 
            currentPlayer = currentPlayer === 'Barbie' ? 'Ken' : 'Barbie';
            message.textContent = finishThem(currentPlayer);
            playSoundEffect(currentPlayer);
            boardColorChanger();   
        }
        else if (ugyanaz) {
            message.textContent = finishThem(currentPlayer);
            cells[index].classList.add('shake');
        }
        
    }

    function finishThem(player) {
    return player === 'Barbie' ? `Finish him ${barbieName}!` : `Finish her ${kenName}!`
    }


function checkWinner() {
     for (const combo of winningCombos) {
        const symbols = combo.map(index => board[index]);
        const uniqueSymbols = new Set(symbols);
        if (uniqueSymbols.size === 1 && symbols[0] !== '') {
            return symbols[0]; 
        }
    }
    return null; 
}

function checkFilled() {
    for (let cellak of cells) {
        if (cellak.innerHTML === "") {
            return true;
        }
    }
    return false;
}


function gameEnded() {
    mainTheme.pause()
    mainTheme.currentTime = 0;
    board = Array(selectedDifficulty).fill('');
    running = false;
    reButton.disabled = false;
    formBackButton.disabled = false;
    clearInterval(count);
    secundDisplay.textContent = "";
    powerUpBarbie = true;
    powerUpKen = true;
}