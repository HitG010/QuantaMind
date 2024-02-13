const minus_btn = document.querySelector('.minus');
const plus_btn = document.querySelector('.plus');

let time = document.querySelector('.actual');


minus_btn.addEventListener('click', () => {
    if(time.innerHTML > 5){
        minus_btn.classList.remove('disabled');
        time.innerHTML -= 5;
        if(time.innerHTML <= 5){
            minus_btn.classList.add('disabled');
        }
    }
})
 
plus_btn.addEventListener('click', () => {
    time.innerHTML = parseInt(time.innerHTML) + 5;
    if(time.innerHTML > 5){
        minus_btn.classList.remove('disabled');
    }
})

const cards = document.querySelectorAll('.category');
let counter = 0;
cards.forEach(card => {
    let isActive = card.classList.contains('active');
    card.addEventListener('click', () => {
        for(let i = 0; i < cards.length; i++){
            cards[i].classList.remove('active');
            counter = 0;
        }
        
        if(counter === 0){
            card.classList.add('active');
            isActive = true;
            counter =1;
        }

    });
});

document.querySelector('.start').addEventListener('click', () => {
        const activeElement = document.querySelector('.active');
        const wordElement = activeElement.querySelector('.word');
        console.log(`duration: ${time.innerHTML} minutes \n category: ${wordElement.innerHTML}`);
        // alert(`duration: ${time.innerHTML} minutes \n category: ${wordElement.innerHTML}`);
        window.location.href = `/meditate/${time.innerHTML}/${wordElement.innerHTML}`;
        // const query = {time: time.innerHTML, category: wordElement.innerHTML};

        // async function postData (url = '', data = {}) {
        //         const response = await fetch(url, {
        //             method: 'POST',
        //             body: JSON.stringify(data) 
        //         });
        //         // return response.json();
        //         const responseText = await response.text();
        //         console.log(responseText);
        // }
        // postData('/', query);
        // // console.log(postdata.text());
        // // return postdata.text();
});
