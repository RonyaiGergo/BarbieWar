/*
 A scoreboard-hoiz való változókat és függvényeket tároljuk itt
 */

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