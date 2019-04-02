/*
 * Create a list that holds all of your cards
 */
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o",
"fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf",
"fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const cardsContainer = document.querySelector(".deck");

let openedCards = [];
let matchedCard = [];

// Initialize the game
function init() {
  for(let i = 0; i < icons.length; i++) {
    const card= document.createElement("li");
    card.classList.add("card");
    card.innerHTML = "<i class='" + icons[i] + "'</i>";
    cardsContainer.appendChild(card);

    // Add Click Event to each card
    click(card);
  }
}


/*
*click Event
*/
function click(card) {
  // card click event
  card.addEventListener("click", function() {

    const currentCard = this;
    const previousCard = openedCards[0];

    // we have an existing OPENED card
    if(openedCards.length === 1){

      card.classList.add("open", "show", "disable");
      openedCards.push(this);

      // compare 2 cards;
      compare(currentCard, previousCard);

    } else {
    // we don't have any opened card
      card.classList.add("open", "show", "disable");
      openedCards.push(this);
    }


  })
}

// compare 2 cards
function compare(currentCard, previousCard) {
  // compare 2 opened cards
  if(currentCard.innerHTML === previousCard.innerHTML) {

    // matched
    currentCard.classList.add("match");
    previousCard.classList.add("match");

    matchedCard.push(currentCard, previousCard);

    openedCards = [];

    // check if the game is over
    isOver();

  } else {
    // wait 500ms then do this
    setTimeout(function() {
      currentCard.classList.remove("open", "show", "disable");
      previousCard.classList.remove("open", "show", "disable");
    }, 500);

    openedCards = [];

  }

  // Add New move
  addMove();
}



// When game is over
function isOver() {
  if(matchedCard.length === icons.length) {
    timer = clearInterval(timer);
    Swal.fire({
      title: 'Congratulations!',
      html: true,
      html: "Time Spent:  " + hour + ":" + min + ":" + sec +
      "<br/> Your Score:  " + starsContainer.innerHTML,
      type: 'success',
      showCancelButton: true,
      confirmButtonColor: '#93abb1',
      cancelButtonColor: '#cfcfcf',
      confirmButtonText: 'Replay?'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Awsome!',
          'Let\'s start the game!',
          'success'
        )
        timer = clearInterval(timer);
        resetTimer();
        cardsContainer.innerHTML = "";
        init();
        // reset any related variables
        openedCards = [];
        matchedCard = [];
        moves = 0;
        movesContainer.innerHTML = 0;
        starsContainer.innerHTML = `
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        `;
      }
    })
  }

}



/*
* Add Moves
*/
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {

  if(moves == 0) {
    timer = setInterval(timerFunction, 1000);
  }
  moves++;
  movesContainer.innerHTML = moves;

  // set Rating
  rating();
}



/*
* Rating
*/

let starsContainer = document.querySelector(".stars");
starsContainer.innerHTML = `
<div id =1 class="fa fa-star"></div>
<div id =2  class="fa fa-star"></div>
<div id =3 class="fa fa-star"></div>
`;

function rating() {
  switch (moves) {
    case 20:
        starsContainer.removeChild(starsContainer.lastElementChild);

      break;

    case 26:
        starsContainer.removeChild(starsContainer.lastElementChild);
      break;
  }
}




/*
* Restart Button
*/
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
  // Delete All cards
  cardsContainer.innerHTML = "";

  // call "init" to create new cards
  shuffle(icons);
  init();

  // reset any related variables
  openedCards = [];
  matchedCard = [];
  moves = 0;
  movesContainer.innerHTML = 0;
  starsContainer.innerHTML = `
  <li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>
  `;

  resetTimer();

});



// start the game for first time
shuffle(icons);
init();



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



/*
* timer function section
*/
let timer;
let sec = 0;
let min = 0;
let hour = 0;
let timer_element = document.querySelector('.timer');


// timer function
function timerFunction() {
  sec++;

  if (sec == 60) {
    sec = 0;
    min++;
  }

  if (min == 60) {
    min = 0;
    hour++;
  }

  displayTime();
}


// display the timer on page
function displayTime() {
  timer_element.innerHTML = hour + ":" + min + ":" + sec;
}


// Reset timer function
function resetTimer() {
  timer = clearInterval(timer);
  sec = 0;
  min = 0;
  hour = 0;
  timer_element.innerHTML = "00:00:00";
}
