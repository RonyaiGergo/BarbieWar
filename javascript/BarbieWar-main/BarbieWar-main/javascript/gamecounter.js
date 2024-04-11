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
                 if (szam == 0 && currentPlayer === "Barbie") {
                    message.textContent = "Ken nyert!";
                    kenScore++; 
                    kenScoreCount.textContent = kenScore;
                    reButton.disabled = false;
                    running = false;
                    clearInterval(count);
                    secundDisplay.textContent = "";
                    
                    }
                    else if (szam == 0 && currentPlayer === "Ken") {
                        message.textContent = "Barbie nyert!";
                        barbieScore++; 
                        barbieScoreCount.textContent = barbieScore;
                        reButton.disabled = false;
                        running = false;
                        clearInterval(count);
                        secundDisplay.textContent = "";
                        
                    }
            },1000);
        }
    }