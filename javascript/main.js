/*
A main tartalmazza a difficultyForm kitöltőt és reButton-t
ami a két gomb amivel indítjuk a játékokat és köröket
*/
startButton = document.getElementById("startButton");
reButton = document.getElementById("replayButton");
var selectedSpeed;
var saved;

document.getElementById("difficultyForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    const selectedDifficulty = document.querySelector('input[name="difficulty"]:checked');
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
        ellenorzo(selectedDifficulty.value);
        reButton.disabled = true;
    } else {
        alert("Nincs helyesen kitöltve a Form!");
    }
});
