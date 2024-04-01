/*
Itt a számlálót tároljuk
ez a setInterval két paraméterrel indul el (1. egy akármilyen function, 2. idő miniszekundumokban)
so itt a funkciót a setInterval-bal definiáltam de ezt külön is tehettem volna
az 1000 pedig 1s-t jelent, azaz másodpercenként futtatja le azt a functiont amit beraktunk az első paraméterbe
a clearInterval pedig törli a setIntervalt azaz ezzel meglehet szakítani
így ha lép valaki ujraindítható a számláló
*/


let count; //kívül definiáljuk hogy máshol is elérjék
    let szam; //same here

    function counter(secundDisplay) {
        clearInterval(count);

        szam = selectedSpeed;
        if (running) {
            count = setInterval(function(){ 
                console.log(szam);
                szam--;
                secundDisplay.textContent = szam;
                if (szam < 2) {
                    if (currentPlayer === 'Barbie') {currentPlayer = 'Ken';}
                    else { currentPlayer = 'Barbie';}
                    message.textContent = `${currentPlayer} következik`;
                    szam = saved;
                }
            },1000);
        }
    }