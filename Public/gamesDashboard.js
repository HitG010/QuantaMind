let simonBtn = document.getElementById('simon-says');
let wordleBtn = document.getElementById('wordle');

simonBtn.addEventListener('click', () => {
    window.location.href = '/dailyChallenges/simonSays';
});

wordleBtn.addEventListener('click', () => {
    window.location.href = '/dailyChallenges/wordle';
});