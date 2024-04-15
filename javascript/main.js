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
var saved;
var randomSzam = Math.random();
console.log(randomSzam)
var aiChoosen;

document.getElementById("difficultyForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    selectedDifficulty = document.querySelector('input[name="difficulty"]:checked');
    selectedSpeed = document.querySelector('input[name="speed"]:checked').value;
    aiChoosen = document.querySelector('input[name="aiChooser"]:checked').value;
    if (aiChoosen == 2) { aiChoosen = true;} else {aiChoosen = false}
    console.log(aiChoosen);
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
    console.log(aiChoosen)
    console.log(randomSzam);
    ellenorzo(selectedDifficulty.value);
    reButton.disabled = true;
});


formBackButton.addEventListener('click',function(){
    document.getElementById("leftSide").classList.remove('eltunteto');
    document.getElementById("scoreBoard").classList.add('eltunteto');
    mainTheme.pause();
    kontener.innerHTML = "";
})