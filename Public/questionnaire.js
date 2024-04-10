let started = false;
let level = 0;
let quesBlock = document.querySelector(".question-block");
let questionNum = document.querySelector(".question-number");
let nxtBtn = document.querySelector(".next-btn");
let mentalWellBeingScore = 0;
let helpQuotient = 0;
let questions = [
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
  "Are you satisfied with your career progress till now? ",
  "How will your rate yourself on 1 to 10 in terms of religeosity? ",
  "How will you rate your childhood memories on scale of 1-10",
  "How do you see your future 5 years from now?",
  "Have you had panic attacks in past or past history of substance abuse or an appointment with mutual health spl in the past?",
];

let options = [
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
  {
    commited: [2, 1],
    single: [2, 1],
    complicated: [1, 2],
    "never had": [2, 2],
    "Just broke up": [1, 2],
  },
  {
    yes: [3, 1],
    Somewhat: [2, 2],
    No: [1, 2],
  },
  {
    1: [1, 2],
    2: [1, 2],
    3: [1, 2],
    4: [1, 2],
    5: [3, 2],
    6: [3, 1],
    7: [3, 1],
    8: [3, 1],
    9: [2, 1],
    10: [2, 1],
  },
  {
    1: [1, 2],
    2: [1, 2],
    3: [1, 2],
    4: [1, 2],
    5: [2, 2],
    6: [2, 2],
    7: [2, 1],
    8: [2, 1],
    9: [3, 1],
    10: [3, 1],
  },
  {
    bright: [3, 1],
    Struggling: [2, 2],
    Dim: [1, 2],
  },
  {
    Yes: [1, 2],
    No: [3, 1],
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
    if (checkAns()) {
      if (level == 15) {
        progress();
        finished();
        // started = false;
        level = 0;
        return;
      }
      const clone = quesBlock.cloneNode(true);
      quesBlock.classList.add("upwards");
      clone.classList.add("newCard");
      document.querySelector(".main-right").append(clone);
      levelUp();
      setTimeout(() => {
        clone.classList.add("hide");
      }, 1200);
    } else {
      // alert("Please select an option");
    }
  }
});

function oneTo10(idx) {
  let optionsQues = document.querySelector(".options form");
  optionsQues.innerHTML = "";

  for (let i = 1; i <= 10; i++) {
    let div = document.createElement("div");
    div.classList.add("option-pair");
    let opt = document.createElement("input");
    let label = document.createElement("label");
    opt.setAttribute("class", "option");
    opt.setAttribute("type", "radio");
    opt.setAttribute("name", idx);
    opt.setAttribute("value", `${i}`);
    opt.addEventListener("click", check);
    opt.setAttribute("id", `${i}`);
    label.setAttribute("for", `${i}`);
    label.innerText = `${i}`;
    div.append(opt);
    div.append(label);
    optionsQues.append(div);
  }
}

function levelUp() {
  level++;
  progress();
  if (level > 15) {
    finished();
    started = false;
    level = 0;
    return;
  }

  nxtBtn.classList.add("disabled-btn");

  quesBlock.classList.add("side-animation");
  questionNum.innerText = `Question ${level}`;
  let ques = document.querySelector(".intro-question");
  ques.innerText = questions[level - 1];
  if (level == 12 || level == 13) {
    oneTo10(level);
    setTimeout(() => {
      quesBlock.classList.remove("side-animation");
      quesBlock.classList.remove("upwards");
    }, 1200);
    return;
  }

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
    opt.setAttribute("name", level);
    opt.setAttribute("value", optText);
    opt.setAttribute("id", optText);
    opt.addEventListener("click", check);
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

let prev = 0;
function progress() {
  let progressBar = document.querySelector(".progress-bar");
  let progressNum = document.querySelector(".progress-num");
  let a = ((level - 1) / 15) * 100;
  a = Math.ceil(a);
  if (prev == a && prev != 0) {
    a = 100;
  }
  let i = prev;
  let id = setInterval(() => {
    if (i == a) {
      clearInterval(id);
    }
    let b = 0;
    let id2 = setInterval(() => {
      if (b == 100) {
        clearInterval(id2);
      }
      progressBar.style.width = `${i + b / 100}%`;
      b++;
    }, 1);
    progressNum.innerHTML = `${i}% Completed`;
    progressBar.style.width = `${i}%`;
    i++;
  }, 100);
  prev = a;
}

function checkAns() {
  let optionsQues = document.querySelector(".options form");
  let flag = false;
  for (let i of optionsQues.elements) {
    console.log(i);
    if (i.checked) {
      flag = true;
      mentalWellBeingScore += options[level - 1][i.value][0];
      helpQuotient += options[level - 1][i.value][1];
      return flag;
    }
  }
  return flag;
}

function finished() {
  // console.log(`mentalWellBeingScore = ${mentalWellBeingScore}`);
  // console.log(`helpQuotient = ${helpQuotient}`);
  sendFormData();
  window.location.href = '/';
}

function check() {
  nxtBtn.classList.remove("disabled-btn");
}

function sendFormData() {
  const data = {
    mentalWellBeingScore,
    helpQuotient
  };

  fetch('/questionnaire', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((response) => {
      if (response.status === 200) {
        console.log('Data sent successfully');
      } else {
        console.error('Failed to send data');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
