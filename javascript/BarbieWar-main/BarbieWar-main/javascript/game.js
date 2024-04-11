/*
 Hát ez még nem teljesen van szétszedve de nem tom merre szedjem már szét ezt XDDD
*/

    let cover = document.createElement("div");
    let barbieChooser = document.createElement("div");
    let kenChooser = document.createElement("div");

    const bb = createImage("gamepic",document.getElementById('barbiepic').src);
    const kk = createImage("gamepic",document.getElementById('kenpic').src);

    function createImage(classs, src) {
        const img = document.createElement('img');
        img.src = src;
        img.className = classs;
        return img;
    }

    barbieChooser.appendChild(bb);
    kenChooser.appendChild(kk);
    
    

function choosePlayer(difficulty) {
    kontener.innerHTML = ""
    kontener.appendChild(cover);
    cover.appendChild(barbieChooser);

    
    cover.className = "cover";
    cover.classList.remove("eltunteto");
    cover.appendChild(kenChooser);
    console.log(cover);
    

    barbieChooser.addEventListener("click",function(){
        currentPlayer = 'Barbie';
        cover.className = "eltunteto";
        ellenorzo(difficulty);
        console.log("barbieef");
    });
    kenChooser.addEventListener("click",function(){
        currentPlayer = 'Ken';
        cover.className = "eltunteto";
        ellenorzo(difficulty);
    });
}




//itt kiválasztja milyen nagy legyen a cucc
function ellenorzo(szam) {
    board = []; //kitisztítja a táblát
    switch (szam) { //szám méretétől függően hozza
        case "9" :
            board = Array(9).fill(''); //a táblát feltöltjük 9 db helyel mert 3x3-as a mezőnk
            winnerMoves(3); //ez a function ami beállítja a tábla méretéhez a nyerő kombókat a tábla méretétől függően
            kontener.classList = "main board3"; //ezeknél a css-t belehet állítani (a main az alap) a board3-board5 cuccokat
            gamestart(9);
            break;
        case "25" :
            board = Array(25).fill('');
            winnerMoves(5);
            console.log(winningCombos);
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


function gamestart(size) {//csak ilyen baby indító, még semmilyen speed vagy akármit nem lehet állitani:(((
        kontener.innerHTML = "" //kitöröljük ha ujrakezdünk egy játékot
        kontener.appendChild(secund);
        board = ['', '', '', '', '', '', '', '', ''];
        for (var i = 0; i < size; i++) {  //itt feltöltjük 0-8 között
            var div = generateDiv(i);  //éppen mondta Jacob hogy Bella where the hell have you been loca?
            kontener.appendChild(div);
        }
        cells = document.querySelectorAll('.cell');
        message.textContent = "Kiválasztva : " + currentPlayer;
        running = true;
        secund.appendChild(secundDisplay);
        counter(secundDisplay);
        console.log("A cucc létrehozva yay");
    }
