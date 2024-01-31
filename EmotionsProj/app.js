let btn = document.querySelector(".emotions button");

btn.addEventListener("click", function () {
  console.log("you clicked a button");
  window.location = "http://127.0.0.1:5000/";
});

let themeBtn = document.querySelector(".themeBtn");

function darkMode() {
  let meterBlock = document.querySelector(".meter-block");
}

themeBtn.addEventListener("click", darkMode);
