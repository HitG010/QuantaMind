// btn.addEventListener("click", function () {
//   console.log("you clicked a button");
//   window.location = "http://127.0.0.1:5000/";
// });

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
