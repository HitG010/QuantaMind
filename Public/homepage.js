let btn = document.querySelector(".emotions button");

btn.addEventListener("click", function () {
  console.log("you clicked a button");
  window.location = "http://127.0.0.1:5000/";
});

let themeBtn = document.querySelector(".themeBtn");

function darkMode() {
  let body = document.querySelector("body");
  body.classList.add("dark-bg");
  document.querySelector("title-upper").classList.add("dark-title");
  document.querySelector("title-lower").classList.add("dark-title");
}

themeBtn.addEventListener("click", darkMode);

//adding buttons functionality for redirection of pages
let questionnaireBtn = document.querySelector(".pink-arrow");
questionnaireBtn.addEventListener("click", function () {
  window.location.href = "/questionnaire";
});

let resourcesBtn = document.querySelector(".red-arrow");
resourcesBtn.addEventListener("click", function () {
  window.location.href = "/resources";
});

let meditateBtn = document.querySelector(".green-arrow");
meditateBtn.addEventListener("click", function () {
  window.location.href = "/meditate";
});

let journalBtn = document.querySelector(".purple-plus");
journalBtn.addEventListener("click", function () {
  window.location.href = "/journal";
});

let analyticsBtn = document.querySelector(".meter-arrow");
analyticsBtn.addEventListener("click", function () {
  window.location.href = "/analytics";
});

let challengesBtn = document.querySelector(".yellow-arrow");
challengesBtn.addEventListener("click", function () {
  window.location.href = "/dailyChallenges";
});


