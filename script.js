let cards = document.querySelectorAll('.card');

let cardsArr = Array.from(cards);

cardsArr.forEach(flipIt)

function flipIt(current) {

    current.addEventListener( 'click', function() {
  
        current.classList.toggle('flip');

    });
};
