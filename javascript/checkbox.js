//gondoltam ilyen vicceske gombot csinálhatnánk de nem vágom 
//miért ugrik fel az oldal tetejére nem úgy kéne neki müdönie :')
const freakyButton = document.getElementById('btn');
let rights;
let bottoms;

freakyButton.addEventListener('mouseover', function () {
    rights = `${Math.ceil(Math.random() * 40)}%`
    freakyButton.style.right = rights;
    bottoms = `${Math.ceil(Math.random() * 40) -120}%`
    freakyButton.style.bottom = bottoms;
});
freakyButton.addEventListener('click', function () {
    alert('Az oldal lenémítva! :)')
})

