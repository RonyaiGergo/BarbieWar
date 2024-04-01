/*
Egy amőba AI ami a minimax algoritmust használja,
de egyenlőre csak tesztelgetem hogy hogyan játszam
*/


startButton = document.getElementById("startButton");
reButton = document.getElementById("replayButton");
var selectedSpeed;
var saved;
var selectedDifficulty;

document.getElementById("difficultyForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    selectedDifficulty = document.querySelector('input[name="difficulty"]:checked');
    selectedSpeed = document.querySelector('input[name="speed"]:checked').value;
    saved = selectedSpeed;
    if (selectedDifficulty) {
        choosePlayer(selectedDifficulty.value);
        reButton.disabled = true;
    } else {
        alert("Nincs helyesen kitöltve a Form!");
    }
    resetScore();

});

reButton.addEventListener('click', function() {
    const selectedDifficulty = document.querySelector('input[name="difficulty"]:checked');
    selectedSpeed = document.querySelector('input[name="speed"]:checked').value;
    saved = selectedSpeed;
    if (selectedDifficulty) {
        board = [];
        currentPlayer = humanPlayer;
        ellenorzo(selectedDifficulty.value);
        reButton.disabled = true;
    } else {
        alert("Nincs helyesen kitöltve a Form!");
    }
});


let humanPlayer;
let aiPlayer;
let currentPlayer;
let board;
const kenp = document.getElementById('kenpic').src; //kijelöli a kenpic id-nak a 'src' tulajdonságát
const bpic = document.getElementById('barbiepic').src; //ugyanaz mint az efelettin
const message = document.getElementById('mess'); //ugye van egy message id amivel kiirjuk hogy ki nyert stb

let cover = document.createElement("div");
let barbieChooser = document.createElement("div");
let kenChooser = document.createElement("div");


function createImage(classs, src) {
    const img = document.createElement('img');
    img.src = src;
    img.className = classs;
    return img;
}

const bb = createImage("gamepic",bpic);
const kk = createImage("gamepic",kenp);
barbieChooser.appendChild(bb);
kenChooser.appendChild(kk);




function choosePlayer(difficulty) {
    kontener.innerHTML = ""
    kontener.appendChild(cover);
    cover.appendChild(barbieChooser);
    
    cover.className = "cover";
    cover.classList.remove("eltunteto");
    cover.appendChild(kenChooser);

    barbieChooser.addEventListener("click",function(){
        humanPlayer = 'Barbie';
        aiPlayer = 'Ken';
        currentPlayer = 'Barbie';
        cover.className = "eltunteto";
        ellenorzo(difficulty);
    });
    kenChooser.addEventListener("click",function(){
        humanPlayer = 'Ken';
        aiPlayer = 'Barbie';
        currentPlayer = 'Ken';
        cover.className = "eltunteto";
        ellenorzo(difficulty);
    });
}




//itt kiválasztja milyen nagy legyen a cucc
function ellenorzo(szam) {
    switch (szam) { //szám méretétől függően hozza
        case "9":
            board =  Array(9).fill('');//a táblát feltöltjük 9 db helyel mert 3x3-as a mezőnk
            winnerMoves(3); //ez a function ami beállítja a tábla méretéhez a nyerő kombókat a tábla méretétől függően
            kontener.classList = "main board3"; //ezeknél a css-t belehet állítani (a main az alap) a board3-board5 cuccokat
            gamestart(9);
            break;
        case "25" :
            board = Array(25).fill('');
            winnerMoves(5);
            kontener.className = "main board5";
            gamestart(25);
            break;
        case "36" :
            board = Array(36).fill('');
            winnerMoves(6);
            kontener.className = "main board6";
            gamestart(36);
            break;
        default:
            alert("Valami a kiválaszásnál nem volt jó:(");
            break;
    }
}




//külön function a divek generálásához ha nagyobb táblát akarunk csinálni
function generateDiv(indexSzam) {
    var divek = document.createElement("div");
    divek.className = "cell"; //adunk neki egy cell osztályt amivel css-ben divafikáljuk
    divek.setAttribute("onclick","makeMove(" + indexSzam + ")"); //meg egy onclick attributumot
    return divek; //maga a függvényt pedig ellehet igy tárolni egy értékként slay tök fun yay
}



var kontener = document.getElementById("board");
let running = false;  // ha fut a játék, true
let playerDisplay = document.getElementById("playerDisplay");

var secund = document.createElement("div");
secund.className = "circle";
var secundDisplay = document.createElement("p");
let cells;


function gamestart(size) {//csak ilyen baby indító, még semmilyen speed vagy akármit nem lehet állitani:(((
        kontener.innerHTML = "" //kitöröljük ha ujrakezdünk egy játékot
        kontener.appendChild(secund);
        for (var i = 0; i < size; i++) {  //itt feltöltjük 0-8 között
            var div = generateDiv(i);  //éppen mondta Jacob hogy Bella where the hell have you been loca?
            kontener.appendChild(div);
        }
        cells = document.querySelectorAll('.cell');
        message.textContent = "Kiválasztva : " + humanPlayer;
        running = true;
    }

//ezt ne is nézzétek elég messy rip XDDDDDDDDD  

function makeMove(index) {
    let mehet = !checkWinner() && running && checkFilled();
    let ugyanaz = true;
    

    if (cells[index].innerHTML === "") {
        ugyanaz = false;
    }

    if (mehet && !ugyanaz) {
        currentPlayer = humanPlayer;
        board[index] = currentPlayer;
        const picapp = document.createElement('img'); 
        picapp.className = 'gamepic'; 
        picapp.src = currentPlayer === 'Barbie' ? bpic : kenp; //itt csak kijelölöm hogy ha barbie van soron akkor ő ha nem akkor a másik kép lesz kijelölve
        cells[index].appendChild(picapp); //itt pedig berakom a cellába
        for (cel of cells) {cel.className = "cell";}
        
        if (checkFilled() && !checkWinner()) {
            aiNextMove();
            if (checkWinner()) { 
                message.textContent = `${currentPlayer} nyert!`;
                updateScore(currentPlayer);
                board = Array(selectedDifficulty).fill('');
                running = false;
                reButton.disabled = false;
                secundDisplay.textContent = "";
            }
        } 
    }
    
        if (!checkFilled() && !checkWinner()) {
            message.textContent = "Holtverseny divák";
            running = false;
            reButton.disabled = false;
            secundDisplay.textContent = "";
        } 

        else if (checkWinner()) { //gondolom egyszerű, megnézi hogy nyertek e vagy holtverseny, ha nem akkor kiirja hogy ki következik
            message.textContent = `${currentPlayer} nyert!`;
            updateScore(currentPlayer);
            board = Array(selectedDifficulty).fill('');
            running = false;
            reButton.disabled = false;
            secundDisplay.textContent = "";
        }

        else if (ugyanaz) {
            message.textContent = `${currentPlayer} következik`;
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





























let barbieScore = 0; 
let kenScore = 0;

function resetScore() {
    barbieScore = 0;
    kenScore = 0;
    barbieScoreCount.textContent = barbieScore;
    kenScoreCount.textContent = kenScore;
}

function updateScore(currentPlayer) {
        if (currentPlayer === 'Barbie') {barbieScore++; barbieScoreCount.textContent = barbieScore}
        else {kenScore++; kenScoreCount.textContent = kenScore}
}

function winnerMoves(num){
    // Ezzel ne is foglalkozzatok nagyon elméletileg jó, ez csak legenerálja a nyerő kombinációkat, nem tudok a kombinációk tárolására jobb módot
    winningCombos = [];
    
    for (let i = 0; i < num; i++) {
    const rowCombo = [];
    for (let j = 0; j < num; j++) {
    rowCombo.push(i * num + j);
    }
    winningCombos.push(rowCombo);
    }
    
    for (let i = 0; i < num; i++) {
    const colCombo = [];
    for (let j = 0; j < num; j++) {
    colCombo.push(i + j * num);
    }
    winningCombos.push(colCombo);
    }
    
    const mainDiagonal = [];
    for (let i = 0; i < num; i++) {
    mainDiagonal.push(i * num + i);
    }
    winningCombos.push(mainDiagonal);
    
    const secondaryDiagonal = [];
    for (let i = 0; i < num; i++) {
    secondaryDiagonal.push(i * num + ((num-1) - i));
    }
    winningCombos.push(secondaryDiagonal);
    }
    