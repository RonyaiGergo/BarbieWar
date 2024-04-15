/*
 Hát ez még nem teljesen van szétszedve de nem tom merre szedjem már szét ezt XDDD
*/

    let cover = document.createElement("div");
    let barbieChooser = document.createElement("div");
    let kenChooser = document.createElement("div");

    
    function createImage(classs, src) {
        const img = document.createElement('img');
        img.src = src;
        img.className = classs;
        return img;
    }

    const bb = createImage("gamepic",document.getElementById('barbiepic').src);
    const kk = createImage("gamepic",document.getElementById('kenpic').src);
    barbieChooser.appendChild(bb);
    kenChooser.appendChild(kk);
    

    const nameForm = document.createElement('form');

    const barbieNameInput = document.createElement('input');
    const kenNameInput = document.createElement('input');
    barbieNameInput.setAttribute('id','barbieNameValue');
    const barbieLabel = document.createElement('label');

    barbieLabel.innerHTML = "Barbie's name";
    const kenLabel = document.createElement('label');
    kenNameInput.setAttribute('id','kenNameValue');
    kenLabel.innerHTML = "Ken's name";

    const nameFormSubmitter = document.createElement('button');
    nameFormSubmitter.setAttribute('type','submit');
    nameFormSubmitter.innerHTML = "Start your game!";
    var barbieName;
    var kenName;

    nameForm.appendChild(barbieNameInput);
    nameForm.appendChild(barbieLabel);
    nameForm.appendChild(kenNameInput);
    nameForm.appendChild(kenLabel);
    nameForm.appendChild(nameFormSubmitter);
    const inputRegex = /\w{3}/;
    var namesAreDifferent = false;
    
    nameForm.addEventListener('submit',function(event){
        event.preventDefault();
        if (inputRegex.test(barbieNameInput.value) && inputRegex.test(kenNameInput.value)) {
        barbieName = barbieNameInput.value;
        kenName = kenNameInput.value;
        cover.removeChild(nameForm);
        barbieLabel.innerHTML = "You named your barbie: " + barbieName;
        kenLabel.innerHTML = "You named your ken: " + kenName;
        cover.appendChild(barbieLabel);
        cover.appendChild(kenLabel);
        namesAreDifferent = true;
        } else { alert('Your name input was wrong!\nEach name should be at least 3 words long!')}  
    })

function choosePlayer(difficulty) {
    kontener.innerHTML = ""
    kontener.appendChild(cover);
   
    cover.className = "cover";
    cover.classList.remove("eltunteto"); 
    cover.appendChild(barbieChooser);
    cover.appendChild(kenChooser);
    cover.appendChild(nameForm);

    barbieChooser.addEventListener("click",function(){
        currentPlayer = 'Barbie';
        playerOne = 'Barbie';
        playerTwo = 'Ken';
        cover.className = "eltunteto";
        ellenorzo(difficulty);
    });
    kenChooser.addEventListener("click",function(){
        currentPlayer = 'Ken';
        playerOne = 'Ken';
        playerTwo = 'Barbie';
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
    if (!namesAreDifferent) {
        barbieName = 'Barbie';
        kenName = 'Ken';
    }
    message.textContent = "Choosen : " + `${currentPlayer === 'Barbie' ? `${barbieName}!` : `${kenName}!`}`;
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
        board = ['', '', '', '', '', '', '', '', ''];
        for (var i = 0; i < size; i++) {  //itt feltöltjük 0-8 között
            var div = generateDiv(i);  //éppen mondta Jacob hogy Bella where the hell have you been loca?
            kontener.appendChild(div);
        }
        cells = document.querySelectorAll('.cell');
        running = true;
        secund.appendChild(secundDisplay);
        counter(secundDisplay);
        boardColorChanger();
        humanPlayer = playerOne;
        aiPlayer = playerTwo;
        mainTheme.play();
        document.getElementById('scoreBoard').classList.remove('eltunteto');
        document.getElementById("leftSide").classList.add('eltunteto');
    }


function boardColorChanger() {
    if (currentPlayer === 'Barbie') 
        {kontener.classList.remove('kenboard'); kontener.classList.add('barbieboard')} 
    else if (currentPlayer === 'Ken') 
        {kontener.classList.remove('barbieboard'); kontener.classList.add('kenboard')}
        
}