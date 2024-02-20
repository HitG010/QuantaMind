var xValues = ["Happy", "Content", "Sad"];
var yValues = [2, 2, 3];
var barColors = [
  "rgba(255, 199, 117, 1)",
  "rgba(108, 251, 191, 1)",
  "rgba(255, 107, 90, 1)",
  "#e8c3b9",
  "#1e7145",
];

new Chart("myChart", {
  type: "pie",
  data: {
    labels: xValues,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues,
      },
    ],
  },
  // options: {
  //   title: {
  //     display: true,
  //     text: "World Wide Wine Production 2018",
  //     },
  //     animation.an
  // },
});

let mentalWellScore = 25;
let helpQuotient = 24;

function rotate(meterPin, final) {
  let pin = document.getElementById(meterPin);
  let initial = -140;
  final = final - 140;
  setInterval(() => {
    if (initial < final) {
      initial++;
      pin.style.transform = `rotate(${initial}deg)`;
    }
    if (initial === final) {
      clearInterval();
    }
  }, 20);
}

function caldeg(score, max) {
  let diff = max - 15;
  return (180 / diff) * (score - 15);
}
rotate("meterPin1", caldeg(mentalWellScore, 45));
rotate("meterPin2", caldeg(helpQuotient, 30));
