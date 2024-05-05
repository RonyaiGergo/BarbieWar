//gondoltam ilyen vicceske gombot csinálhatnánk de nem vágom 
//miért ugrik fel az oldal tetejére nem úgy kéne neki müdönie :')
const freakyButton = document.getElementById('btn');
let rights;
let bottoms;


freakyButton.addEventListener('mouseover', function () {

    rights = `${Math.ceil(Math.random() * 46)}%`
    freakyButton.style.right = rights;
    bottoms = `${Math.ceil(Math.random() * 40) + 150}%`
    freakyButton.style.top = bottoms;
});
freakyButton.addEventListener('click', function () {
    alert('Az oldal lenémítva! :)')
})