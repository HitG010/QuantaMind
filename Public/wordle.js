// get a random word from the list of words
// ket the users enter theier guess
// append the letters into the letter containers as they are getting typed
// after 5 words and enter is pressed, check for each letter if it is present in the word or not
// if present and in the right order, then add classname .correct to the letter container
// if present but in the wrong order, then add classname .presrent to the letter container
// if no present in the word, then do nothing
// if each and every letter of the word is correctly placed, then return winning message
// if 6 tries are over thwn return try again message.

const words = [
    "happy",
    "sorry",
    "smile",
    "trust",
    "sweet",
    "bliss",
    "brave",
    "loyal",
    "faith",
    "peace",
    "cheer",
    "alive",
    "clear",
    "proud",
    "smell",
    "adore",
    "amour",
    "sweet",
    "heart",
    "affix",
    "flame",
    "grace",
    "mercy",
    "power",
    "glory",
    "honor",
    "glass",
    "mouse",
    "fairy",
    "lemon",
    "oasis",
    "sunny",
    "Unity",
    "earth",
    "grape",
    "Dream",
    "quite",
    "magic",
    "light",
    "snack",
    "overt",
    "break",
    "chime",
    "birth",
    "amber",
    "swift",
    "ocean",
    "world",
    "water",
    "green",
    "fresh",
    "jolly",
    "cloud",
    "music",
    "fleet",
    "horse",
    "jelly",
    "apple",
    "queen"
]
let guessNo = 0;
let letterIdx = 0;
let guessedWord = "";

let randomWord = words[Math.floor(Math.random() * words.length)];
console.log(randomWord);

// when letter is clicked on keyboard
document.addEventListener("keyup", (e) => {
    let letter = e.key;
    console.log(`${letter} is clicked.`);
    if(letter === "Enter" && letterIdx === 5){
        checkWord();
        return;
    }
    if(letter === "Enter" && letterIdx != 5){
        return;
    }
    if(letter === "Backspace"){
        clear();
        return;
    }
    insertLetter(letter);
})

// when letter is clicked from from onscreen keyboard
let btn = document.querySelectorAll(".keyboard-button");
btn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        let letter = e.target.innerHTML;
        console.log(`${letter} is clicked.`);
        if(letter === "Enter" && letterIdx === 5){
            checkWord();
            return;
        }
        if(letter === "Enter" && letterIdx != 5){
            return;
        }
        if(letter === "Clear"){
            clear();
            return;
        }
        insertLetter(letter);
    })
})

// creating a function to append the letters into the letter containers as they are getting typed
function insertLetter(letter){
    if(letterIdx >= 5){
        return;
    }
    let letterRow = document.getElementsByClassName("word")[guessNo];
    let letterContainer = letterRow.children[letterIdx];
    letterContainer.innerText = letter;
    guessedWord += letter;
    letterIdx++;
}

function checkWord(){
    let isPresent = new Request(`https://api.wordnik.com/v4/word.json/${guessedWord}/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`);
    fetch(isPresent)
    .then((response) => {
        if(response.status === 404){
            console.log("enter a valid word.");
            for(let i = 0; i < randomWord.length; i++){
                clear();
            }
            guessedWord = "";
            let validWordContainer = document.querySelector(".valid");
            validWordContainer.style.display = "flex";
            setTimeout(() => {
                validWordContainer.style.display = "none";
            }, 1000);
            return;
        }
        else{
            let correct_places = 0;
    for(let i = 0; i < randomWord.length; i++){
        let letterRow = document.getElementsByClassName("word")[guessNo];
        let letterContainer = letterRow.children[i];
        let letter = letterContainer.innerText;
        letter = letter.toLowerCase();
        if(letter === randomWord[i]){
            console.log(letter, randomWord[i]);
            letterContainer.classList.add("correct");
            shadeButtons(letter, "correct");
            correct_places++;
        }
        else{
            letterContainer.classList.add("notpresent");
            shadeButtons(letter, "notpresent");
            for(let j = 0; j < randomWord.length; j++){
                if(letter === randomWord[j]){
                    console.log(letter, randomWord[j]);
                    letterContainer.classList.add("present");
                    shadeButtons(letter, "present");
                    letterContainer.classList.remove("notpresent");
                    break;
                }
            }
        }
        guessedWord = "";
    }
    console.log(correct_places);
    if(correct_places === randomWord.length){
        let youwonContainer = document.querySelector(".youwon");
        for(let i = 0; i < randomWord.length; i++){
            let letterRow = document.querySelector(".random-word");
            let letterContainer = letterRow.children[i];
            letterContainer.innerText = randomWord[i];
        }
        youwonContainer.style.display = "flex";
        return;
    }

    if(guessNo === 5){
        console.log("haar gya tu bhai!")
        let gameoverContainer = document.querySelector(".gameover");
        for(let i = 0; i < randomWord.length; i++){
            let letterRow = document.querySelectorAll(".random-word");
            let letterContainer = letterRow[1].children[i];
            letterContainer.innerText = randomWord[i];
        }
        gameoverContainer.style.display = "flex";
        return;
    }

    guessNo++;
    letterIdx = 0;
    shadeButtons();
        }
    })
}

function clear(){
    if(letterIdx > 0){
        letterIdx--;
        let letterRow = document.getElementsByClassName("word")[guessNo];
        let letterContainer = letterRow.children[letterIdx];
        letterContainer.innerText = "";
        guessedWord = guessedWord.slice(0, -1);
    }
}

function shadeButtons (letter, param){
    for(const key of document.getElementsByClassName("keyboard-button")){
        if(key.textContent === letter){
            if(param === "correct"){
                key.classList.add("correct");
            }
            if(param === "present"){
                key.classList.add("present");
                key.classList.remove("notpresent");
            }
            if(param === "notpresent"){
                key.classList.add("notpresent");
            }
        }

    }
}

// how to play container
let howBtn = document.querySelector('.how-to-play');
let howContainer = document.querySelector('.how');

howBtn.addEventListener('mouseover', () => {
    howContainer.style.display = 'flex';
});

howBtn.addEventListener('mouseout', () => {
    howContainer.style.display = 'none';
});


// restart button
let restartBtn = document.querySelectorAll('.restart');
restartBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        location.reload();
    })
});