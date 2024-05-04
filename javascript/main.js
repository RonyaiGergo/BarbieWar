/*
A main tartalmazza a difficultyForm kitöltőt és reButton-t
ami a két gomb amivel indítjuk a játékokat és köröket
*/

document.getElementById('scoreBoard').classList.add('eltunteto');
startButton = document.getElementById("startButton");
reButton = document.getElementById("replayButton");
formBackButton = document.getElementById('FormBack');

var selectedDifficulty;
var selectedSpeed;
var randomSzam = Math.random();
var aiChoosen;
var soundState = true;

document.getElementById("difficultyForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    selectedDifficulty = document.querySelector('input[name="difficulty"]:checked');
    selectedSpeed = document.querySelector('input[name="speed"]:checked').value;
    aiChoosen = document.querySelector('input[name="aiChooser"]:checked').value;

    selectedDifficulty = parseInt(selectedDifficulty.value);
    boardSize = selectedDifficulty;
    console.log(boardSize)
    aiChoosen = aiChoosen === "2" ? true : false;

    selectedDifficulty ? choosePlayer(selectedDifficulty.value) : alert("Nincs helyesen kitöltve a Form!");

    resetScore();
});

reButton.addEventListener('click', function() {
    ellenorzo();
});


formBackButton.addEventListener('click',function(){
    document.getElementById("leftSide").classList.remove('eltunteto');
    document.getElementById("scoreBoard").classList.add('eltunteto');
    gameEnded();
    kontener.innerHTML = "";
})


const musics = document.querySelectorAll('audio');
// Kezdetben a hang állapota néma

document.getElementById('btn').addEventListener('click', function () {
    soundState = !soundState; // Az állapot váltása

    musics.forEach(music => {
        music.currentTime = 0; // Zenék visszaállítása az elejére
        music.muted = !soundState; // A zenék hangosak lesznek, ha soundState false
    });
});
