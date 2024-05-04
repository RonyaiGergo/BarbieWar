const player1Sound = document.getElementById('player1Sound');
const player2Sound = document.getElementById('player2Sound');
const mainTheme = document.getElementById('mortalTheme');

const noi_hangok = [
  'audio/holgy/alm.wav',
  'audio/holgy/any.wav',
  'audio/holgy/gum.wav',
  'audio/holgy/ily.wav',
  'audio/holgy/lem.wav',
  'audio/holgy/nagy.wav',
]

const ferfi_hangok = [
  'audio/ferfi/akr.wav',
  'audio/ferfi/boh.wav',
  'audio/ferfi/gond.wav',
  'audio/ferfi/kiny.wav',
  'audio/ferfi/megy.wav',
  'audio/ferfi/taln.wav',
]

function playSoundEffect(player) {
    if (player === 'Ken') {
    player2Sound.pause(); // Pause player 2 sound effect if it's playing
    player1Sound.currentTime = 0; // Reset playback position to start for player 1 sound effect
    player1Sound.play(); // Play player 1 sound effect
  } else if (player === 'Barbie') {
    player1Sound.pause(); 
    player2Sound.currentTime = 0;
    player2Sound.play(); 
  }
}

const newHang = document.getElementById('insultAudio');

function randomEndSound(player) {
  const ranIndex = Math.floor(Math.random() * 6);
  if(player === 'Barbie') {
    const ranHang = noi_hangok[ranIndex];
    newHang.setAttribute('src',ranHang);
    newHang.play();
  } else {
    const ranHang = ferfi_hangok[ranIndex];
    newHang.setAttribute('src',ranHang);
    newHang.play();
  } 
}