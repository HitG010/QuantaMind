let started = false;
let level = 0;
let quesBlock = document.querySelector(".question-block");
let questionNum = document.querySelector(".question-number");
let nxtBtn = document.querySelector(".next-btn");

questions = [
  "How are you feeling now? ",
  "Do you regret decisions taken in your past?",
  "Do you use Alcohol/Smoke to relieve stress? ",
  "What kind of relationship\n you have with your\n parents/siblings/kids? ",
  "Are you happy with your image at your place of work/college? ",
  "How much time you spend outdoor on an average socializing or at gym on a weekly basis? ",
  "How will you rate your activity status on social media (fb/insta)? ",
  "How long it takes you to sleep after you lay down on bed? ",
  "Do you make friends easily? ",
  "What is your current relationship? ",
  "Are you satisfied with ",
];

options = [
  {
    confused: [1, 2],
    anxious: [1, 2],
    "ok ok": [2, 2],
    "chilled out": [2, 1],
    numb: [1, 2],
    excited: [3, 1],
    "mixed bag": [3, 1],
  },
  {
    "A lot": [1, 2],
    "You could have taken better": [2, 2],
    "No regrets": [3, 1],
  },
  {
    Sometimes: [1, 1],
    Never: [2, 1],
    Occasionally: [3, 1],
    Regularly: [1, 2],
  },
  {
    "Hi-Hello": [1, 1],
    "You talk everything": [3, 1],
    "You talk whats relevant\n to them": [2, 2],
    "Mostly texting": [1, 2],
  },
  {
    "Very happy": [2, 1],
    "Happy but trying to improve": [3, 1],
    "ok ok": [2, 1],
    Disappointed: [1, 2],
    "You don't care": [1, 2],
  },
  {
    "None to 2 hours": [1, 2],
    "2 to 4 hours": [2, 2],
    "Greater than 4 hours": [3, 1],
  },
  {
    "very active": [2, 1],
    "post only when relevant": [3, 1],
    "post when you feel like": [3, 2],
    "Never Post": [2, 2],
  },
  {
    "You don't know because you keep scrolling": [2, 2],
    Immediately: [3, 1],
    "It takes a while": [2, 2],
    "You take sleeping pill/alcohol to sleep": [1, 2],
  },
  {
    Yes: [3, 1],
    No: [1, 2],
    "I'm okay with myself": [2, 2],
  },
];
quesBlock.addEventListener("click", () => {
  if (started === false) {
    console.log("Questionnaire started");
    levelUp();
    started = true;
    nxtBtn.classList.remove("hide");
    document
      .querySelector(".options")
      .removeChild(document.querySelector(".get-started"));
  }
});

nxtBtn.addEventListener("click", () => {
  if (started === true) {
    const clone = quesBlock.cloneNode(true);
    quesBlock.classList.add("upwards");
    clone.classList.add("newCard");
    document.querySelector(".main-right").append(clone);
    levelUp();
    setTimeout(() => {
      clone.classList.add("hide");
    }, 1200);
  }
});

function levelUp() {
  level++;
  quesBlock.classList.add("side-animation");
  questionNum.innerText = `Question ${level}`;
  let ques = document.querySelector(".intro-question");
  ques.innerText = questions[level - 1];
  let optionsQues = document.querySelector(".options form");
  optionsQues.innerHTML = "";
  console.log(options[level - 1]);
  let temp = Object.keys(options[level - 1]);
  console.log(temp);
  for (let optText of Object.keys(options[level - 1])) {
    let div = document.createElement("div");
    div.classList.add("option-pair");
    let opt = document.createElement("input");
    let label = document.createElement("label");
    opt.setAttribute("class", "option");
    opt.setAttribute("type", "radio");
    opt.setAttribute("name", optText);
    label.setAttribute("for", optText);
    label.innerText = optText;
    div.append(opt);
    div.append(label);
    optionsQues.append(div);
  }
  setTimeout(() => {
    quesBlock.classList.remove("side-animation");
    quesBlock.classList.remove("upwards");
  }, 1200);
}
