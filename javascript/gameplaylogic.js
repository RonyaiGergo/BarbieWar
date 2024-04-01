/*
A gameplaylogic a játékhoz tartozó logikákat tartalmazza
*/
let currentPlayer;
const kenp = document.getElementById('kenpic').src; //kijelöli a kenpic id-nak a 'src' tulajdonságát
const bpic = document.getElementById('barbiepic').src; //ugyanaz mint az efelettin
const message = document.getElementById('mess'); //ugye van egy message id amivel kiirjuk hogy ki nyert stb




//ezt ne is nézzétek elég messy rip XDDDDDDDDD  

function makeMove(index) {
    let mehet = !checkWinner() && running && checkFilled();
    let ugyanaz = true;

    if (cells[index].innerHTML === "") {
        ugyanaz = false;
    }
    if (mehet && !ugyanaz) { 
        board[index] = currentPlayer;
        const picapp = document.createElement('img'); 
        /* hát én nem tom hogy ezt egyszerűbben is meglehet e csinálni
        de én létrehozok egy img nevű elemet amibe belerakom a barbie vagy ken képek src tulajdonságát 
        majd ezt rakom bele a kijelölt board-ba
        */
        picapp.className = 'gamepic'; 
        picapp.src = currentPlayer === 'Barbie' ? bpic : kenp; //itt csak kijelölöm hogy ha barbie van soron akkor ő ha nem akkor a másik kép lesz kijelölve
        cells[index].appendChild(picapp); //itt pedig berakom a cellába
        for (cel of cells) {cel.className = "cell";}
       console.log("A lépés jó volt -> " + (index+1));
    }

        if (!checkFilled() && !checkWinner()) {
            message.textContent = "Holtverseny divák";
            running = false;
            reButton.disabled = false;
            clearInterval(count);
            secundDisplay.textContent = "";
        } 
        else if (checkWinner()) { //gondolom egyszerű, megnézi hogy nyertek e vagy holtverseny, ha nem akkor kiirja hogy ki következik
            message.textContent = `${currentPlayer} nyert!`;
            updateScore(currentPlayer);
            board = ['', '', '', '', '', '', '', '', ''];
            running = false;
            reButton.disabled = false;
            clearInterval(count);
            secundDisplay.textContent = "";
        }
        else if (running == true && checkFilled() && !ugyanaz){
            currentPlayer = currentPlayer === 'Barbie' ? 'Ken' : 'Barbie';
            message.textContent = `${currentPlayer} következik`;
        }
        else if (ugyanaz) {
            message.textContent = `${currentPlayer} következik`;
            console.log("Ez a lépés rossz volt -> " + (index+1));
            cells[index].className = 'rossz';
        }
    }


//ez csak átnézi hogy ha nem üres és mind a 3 winning kombóban ugyanolyan elem van slay tök fun
//bár a holtverseny még nem működik de ezzel nem volt kedvem foglalkozni éppen sorry divak<3
function checkWinner() { //nah ezt hajnalban agyaltam össze w3schoolal meg chatgpt-vel, nem tudom hogy perfekt e de jóez
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
            break;
        }
    }
    return false;
}
