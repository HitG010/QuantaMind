async function scrolling() {
  let middleCard = document.querySelector(".middle-card");
  let cards = document.querySelector(".cards-container");
  let leftCard = document.querySelector(".left-card");
  let rightCard = document.querySelector(".right-card");
  await animation();
  middleCard.classList.remove("middle-card");
  middleCard.classList.add("left-card");
  leftCard.classList.remove("left-card");
  leftCard.classList.add("right-card");
  rightCard.classList.remove("right-card");
  rightCard.classList.add("middle-card");
  cards.innerHTML = "";
  cards.appendChild(middleCard);
  cards.appendChild(rightCard);
  cards.appendChild(leftCard);
}

function animation() {
  return new Promise((resolve, reject) => {
    let middleCard = document.querySelector(".middle-card");
    let leftCard = document.querySelector(".left-card");
    let rightCard = document.querySelector(".right-card");

    middleCard.classList.add("m-anim");
    rightCard.classList.add("r-anim");
    leftCard.classList.add("l-anim1");
    setTimeout(() => {
      leftCard.classList.remove("l-anim1");
      leftCard.classList.add("l-anim2");
    }, 1000);
    setTimeout(() => {
      leftCard.classList.remove("l-anim2");

      middleCard.classList.remove("m-anim");
      rightCard.classList.remove("r-anim");
      resolve();
    }, 2000);
  });
}
setInterval(scrolling, 5000);
// scrolling();

let quotesBtn = document.querySelector('.quotes');
quotesBtn.addEventListener('click', () => {
  window.location.href = '/resources/quotes';
});

let articlesBtn = document.querySelector('.articles');
articlesBtn.addEventListener('click', () => {
  window.location.href = '/resources/articles';
});
let musicBtn = document.querySelector('.music');
musicBtn.addEventListener('click', () => {
  window.location.href = '/resources/music';
});