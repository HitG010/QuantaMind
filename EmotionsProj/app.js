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
