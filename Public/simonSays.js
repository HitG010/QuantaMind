let started = false;
let p1 = document.querySelector(".press");
let gameSeq = [];
let userSeq = [];
let btnClass = ["yellow", "red", "green", "blue"];
let btns = document.querySelectorAll(".btn");
let counter = document.querySelector(".streak1");
let dailyStreak = document.querySelector(".dailyStreak");


document.addEventListener("keypress", function () {
  if (started === false) {
    console.log("Game started");
    started = true;
    levelUp();
  }
});

play_btn = document.querySelector(".play");
play_btn.addEventListener("click", () => {
  if (started === false) {
    console.log("Game started");
    started = true;
    
    document.querySelector(".info-text").innerHTML = "Your Score"; 
    document.querySelector(".play").innerHTML = "Play";
    levelUp();
  }
})

let level = 0;
let userLvl = 0;

function flash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    console.log("flash");
    btn.classList.remove("flash");
  }, 150);
}

function btnFlash() {
  let idx = 0;
  setTimeout(function () {
    let id = setInterval(function () {
      let btn = document.querySelector(`.${gameSeq[idx]}`);
      flash(btn);
      idx++;
      if (idx == level) {
        clearInterval(id);
      }
    }, 500);
  }, 1000);
}

function levelUp() {
  counter.innerText = level;
  level += 1;
  p1.innerText = `Level ${level}`;

  let rdmIdx = Math.floor(Math.random() * 4);
  let rdmClr = btnClass[rdmIdx];
  let btn = document.querySelector(`.${rdmClr}`);
  gameSeq.push(rdmClr);
  console.log(gameSeq);
  btnFlash();
}

function pressCheck() {
  if (userLvl == level) {
    let body = document.querySelector("body");
    body.classList.add("correct");
    setTimeout(function () {
      body.classList.remove("correct");
    }, 250);
    levelUp();
    userLvl = 0;
    userSeq = [];
  }
}

for (let btn of btns) {
  btn.addEventListener("click", btnPress);
}

function btnPress() {
  if(started === false) return;
  console.log("button clicked");
  let clr = this.getAttribute("id");
  console.log(this);
  if (clr == gameSeq[userLvl]) {
    userSeq.push(clr);
    this.classList.add("correct");
    setTimeout(() => {
      this.classList.remove("correct");
    }, 250);
    userLvl++;
    pressCheck();
  } else {
    document.querySelector(".info-text").innerHTML = "Game Over"; 
    document.querySelector(".play").innerHTML = "Restart";
    let body = document.querySelector("body");
    body.classList.add("incorrect");
    setTimeout(function () {
      body.classList.remove("incorrect");
    }, 250);

    userSeq = [];
    gameSeq = [];
    level = 0;
    userLvl = 0;
    started = false;
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const prevDate = fetch("/fetchDate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((data) => {
        console.log(data.status);
        data = data.status;
        if(data == 200){
          dailyStreak.innerText = parseInt(dailyStreak.innerText) + 1;
        }
        else{
          dailyStreak.innerText = 1;
        }
      });
    
  }
}
