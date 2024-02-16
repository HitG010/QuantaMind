let url = "https://type.fit/api/quotes";

// async function getQuote() {
//   try {
//     const config = {
//       headers: {
//         Accept: "*/*",
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//       },
//     };
//     let response = await axios.get(url, config);
//     console.log(response);
//     return response;
//   } catch (error) {
//     console.log(error);
//     return "An error occurred";
//   }
// }

// async function displayQuote() {
//   let quote = await getQuote();
//   let quoteDiv = document.querySelector(".quote");
//   quoteDiv.innerHTML = quote;
// }

const api_url = "https://zenquotes.io/api/quotes/";

async function getapi(url) {
  const response = await fetch(url);
  var data = await response.json();
  console.log(data);
}

getapi(api_url);

// displayQuote();
