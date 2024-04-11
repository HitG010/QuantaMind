var xValues = [];
var yValues = [];
async function getEmotions(){
  const result = await fetch("/getEmotions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  const data = await result.json();
  xValues = data.xValues;
  yValues = data.yValues;
  // console.log(xValues);
  // console.log(yValues);
  if(xValues.length === 0){
    const chart = document.getElementById("myChart");
    const data = document.getElementById("notEnoughData");
    data.style.display = "block";
    chart.style.display = "none";
  }

  else{
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
  }

  
}
getEmotions();
// fetch("/getEmotions", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({}),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     xValues = data.xValues;
//     yValues = data.yValues;
//   });

// console.log(xValues);
// console.log(yValues);


// post request to the server to get the mentalWellBeingScore and helpQuotient of the user


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

async function getScores(){
  const result = await fetch("/analytics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  return result.json();

}
let mentalWellScore = 0;
let helpQuotient = 0;
getScores().then((data) => {
  mentalWellScore = data.mentalWellBeingScore;
  helpQuotient = data.helpQuotient;
  if(mentalWellScore === 0 && helpQuotient === 0){
    const info = document.getElementById("info");
    const pageEles = document.querySelector(".main");
    info.style.display = "block";
    pageEles.style.display = "none";
  }
  rotate("meterPin1", caldeg(mentalWellScore, 45));
  rotate("meterPin2", caldeg(helpQuotient, 30));
}
);


