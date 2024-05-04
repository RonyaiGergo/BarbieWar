/*
 Hát ez még nem teljesen van szétszedve de nem tom merre szedjem már szét ezt XDDD
*/
    let cover = document.createElement("div");
    let barbieChooser = document.createElement("div");
    let kenChooser = document.createElement("div");
    var board = [];
    var barbieName;
    var kenName;
    var characterChoosen = false;

    function createImage(classs, src) {
        const img = document.createElement('img');
        img.src = src;
        img.className = classs;
        return img;
       }

    const bb = createImage("pichoose",document.getElementById('barbiepic').src);
    const kk = createImage("pichoose",document.getElementById('kenpic').src);
    barbieChooser.appendChild(bb);
    kenChooser.appendChild(kk);
    
       //BIGASS FORM
    const nameForm = document.createElement('karakterValasztoForm');


    //Forms cuccai
    const barbieNameInput = document.createElement('input');
    const kenNameInput = document.createElement('input');
    barbieNameInput.setAttribute('id','barbieNameValue');
    kenNameInput.setAttribute('id','kenNameValue');
    barbieNameInput.setAttribute('placeholder','Barbie');
    const barHolder = barbieNameInput.getAttribute('placeholder');
    kenNameInput.setAttribute('placeholder','Ken');
    const kenHolder = kenNameInput.getAttribute('placeholder');

    const barbieLabel = document.createElement('label');
    barbieLabel.innerHTML = "Barbie neve";
    barbieLabel.className = "karakterLabel";
    const kenLabel = document.createElement('label');
    kenLabel.innerHTML = "Ken neve";
    kenLabel.className = "karakterLabel";

    const nameFormSubmitter = document.createElement('input');
    nameFormSubmitter.setAttribute('type','submit');
    nameFormSubmitter.setAttribute('id','charactersubmit')
    nameFormSubmitter.innerHTML = "Nevek Beállítása";
    

    //A forms divek faszom
    const karakterHead = document.createElement('div');
    karakterHead.setAttribute('id','karakterHead');
    const karakterText = document.createElement('p');
    karakterText.innerHTML = "Válaszd ki a kezdőjátékos ikonját!<br>Végig a kiválasztott karakterrel fogsz játszani ha az AI az ellenfeled";
    karakterHead.appendChild(karakterText);
    const karakterMain = document.createElement('div');
    karakterMain.setAttribute('id','karakterMain');


    //karaktervalasztos divek
    const barbieKarakter = document.createElement('div');
    barbieKarakter.setAttribute('class','karaktervalaszt');
    barbieKarakter.appendChild(barbieChooser);
    barbieKarakter.appendChild(barbieNameInput);
    barbieKarakter.appendChild(barbieLabel);
    karakterMain.appendChild(barbieKarakter);

    
    const kenKarakter = document.createElement('div');
    kenKarakter.setAttribute('class','karaktervalaszt');
    kenKarakter.appendChild(kenChooser);
    kenKarakter.appendChild(kenNameInput);
    kenKarakter.appendChild(kenLabel);
    karakterMain.appendChild(kenKarakter)


    //karakterfooter cucc ig
    const karakterFooter = document.createElement('div');
    karakterFooter.setAttribute('id','karakterFooter');
    karakterFooter.appendChild(nameFormSubmitter);



    //inputos cuccok faszom
    nameForm.appendChild(karakterMain);
    nameForm.appendChild(karakterFooter);
    var namesAreDifferent = false;
    
nameFormSubmitter.addEventListener('click',function(event){
    event.preventDefault();
    console.log('sdlayerf');
    if (!characterChoosen) {
        alert('Válassz ki egy játékost kérlek!');
        return;
    }
    if (barbieNameInput.value !== barHolder && kenNameInput.value !== kenHolder) {
        barbieName = barbieNameInput.value;
        kenName = kenNameInput.value;
        cover.removeChild(nameForm);
        barbieLabel.innerHTML = "A barbie neve: " + barbieName;
        kenLabel.innerHTML = "A ken neve: " + kenName;
        namesAreDifferent = true;
        ellenorzo();
    }
    else { barbieName = barbieNameInput.value;
        cover.removeChild(nameForm);
        barbieName = "Barbie";
        kenName  = "Ken";
        alert('Rossz volt az inputod!\nKérlek próbáld újra írni a neveket!')}  
})




function choosePlayer(difficulty) {
    kontener.innerHTML = ""
    kontener.appendChild(cover);
   
    cover.classList.remove("eltunteto"); 
    cover.className = "cover";
    cover.appendChild(karakterHead);
    barbieChooser.style.display = "inline-block";
    kenChooser.style.display = "inline-block";
    cover.appendChild(nameForm);

    barbieChooser.addEventListener("click",function(){
        barbieChooser.style.border = "2px solid red";
        kenChooser.style.border = "none";
        currentPlayer = 'Barbie';
        playerOne = 'Barbie';
        playerTwo = 'Ken';
        characterChoosen = true;
        console.log(currentPlayer + " : jelenlegi player")
    });
    kenChooser.addEventListener("click",function(){
        kenChooser.style.border = "2px solid red";
        barbieChooser.style.border = "none";
        currentPlayer = 'Ken';
        playerOne = 'Ken';
        playerTwo = 'Barbie';
        characterChoosen = true;
        console.log(currentPlayer + " : jelenlegi player")
    });
}




function ellenorzo() {
    board = Array(selectedDifficulty).fill('');
    winnerMoves(Math.sqrt(selectedDifficulty));
    kontener.classList = `main board${Math.sqrt(selectedDifficulty)}`;
    gamestart(selectedDifficulty);
    if (!namesAreDifferent) {
        barbieName = 'Barbie';
        kenName = 'Ken';
    }
    message.textContent = "Choosen : " + `${currentPlayer === 'Barbie' ? `${barbieName}!` : `${kenName}!`}`;
}




function generateDiv(indexSzam) {
    var divek = document.createElement("div");
    divek.className = "cell"; 
    divek.setAttribute("onclick","makeMove(" + indexSzam + ")"); //meg egy onclick attributumot
    return divek; 
}



var kontener = document.getElementById("board");
let running = false;  // ha fut a játék, true
let playerDisplay = document.getElementById("playerDisplay");

var secund = document.createElement("div");
secund.className = 'circle';
var secundDisplay = document.createElement("p");
let cells;

function gamestart(size) {//csak ilyen baby indító, még semmilyen speed vagy akármit nem lehet állitani:(((
    kontener.innerHTML = "" //kitöröljük ha ujrakezdünk egy játékot
    kontener.appendChild(secund);
    running = true;
    reButton.disabled = true;

    for (var i = 0; i < size; i++) {  //itt feltöltjük 0-8 között
        var div = generateDiv(i);  //éppen mondta Jacob hogy Bella where the hell have you been loca?
        kontener.appendChild(div);
    }

    cells = document.querySelectorAll('.cell');
    for (cel of cells) {cel.className = "cell";}
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