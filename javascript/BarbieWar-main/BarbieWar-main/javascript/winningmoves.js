/*
A winnerMoves-on szerintem soha nem fogunk dolgozni,
ez igazából teljesen dinamikus és ELMÉLETILEG tökéletes
ahogy használjuk igy foglalkozni nem is kell vele
*/
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
    