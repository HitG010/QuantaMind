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

let dailyStreak = document.querySelector(".streak").innerText;

// window.onpageshow = function (event) {
//   fetch('/dailyStreak', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'x-access-token': localStorage.getItem('token')
//     }
//   })
//     .then((response) => {
//       return response.json();
//       // dailyStreak.innerText =(response.dailyStreak) + "🔥";
//     })
//     .then((data) => {
//       console.log(data);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//   })
// }