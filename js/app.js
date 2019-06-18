// Create an array to hold all cards
let card = document.getElementsByClassName("card");
let cards = [...card];

// Create deck to hold all cards
const deck = document.getElementById("card-deck");

// declare move variable
let moves = 0;
let counter = document.querySelector(".moves");

// declare variables for star icons
const stars = document.querySelectorAll(".fa-star");

// declare variables of matched cards
let matchedCard = document.getElementsByClassName("match");

// declaring star list
let startList = document.querySelectorAll(".star li");

//close icon modal
let closeIcon = document.querySelector(".close");

// declare modal
let modal = document.getElementById("popup1");

// create array for opened cards
var openedCards = [];

// @description shuffles cards
// @param {array}
// @returns shuffledarray
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
};

// @description shuffles cards when page loads/refreshed
document.body.onload = startGame();

// @description function to start a new game
function startGame() {
	// empty the openCards array
	openCards = [];

	// shuffle deck
	cards = shuffle(cards);
	
	// remove all existing classes from each card
	for (var i = 0; i < cards.length; i++) {
		deck.innerHTML = "";
		[].forEach.call(cards, function(item) {
			deck.appendChild(item);
		});
		cards[i].classList.remove("show", "open", "match", "disabled");
	}

	// reset moves
	moves = 0;
	counter.innerHTML = moves;

	// reset rating
	for (var i = 0; i < stars.length; i++) {
		stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
	}

	// reset timer
	second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

// @description toggles open and show class to display cards clicked on by user
var displayCard = function () {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

// @description add opened cards to openedCards array and check if card matches
function cardOpen() {
	openedCards.push(this);
	var len = openedCards.length;
	if (len === 2) {
		moveCounter();
		if (openedCards[0].type === openedCards[1].type) {
			matched();
		} else {
			unmatched();
		}
	}
};

// @description function for when cards match
function matched() {
	openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}

// @description function for when cards do not match
function unmatched() {
	openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    }, 1100);
}

// @description function to disable cards temporarily
function disable() {
	Array.prototype.filter.call(cards, function(card) {
		card.classList.add("disabled");
	});
}

// @description function to enable cards and disable matched cards
function enable() {
	Array.prototype.filter.call(cards, function(card) {
		card.classList.remove('disabled');
		for (var i = 0; i < matchedCard.length; i++) {
			matchedCard[i].classList.add("disabled");
		}
	});
}

// @description function to count playes moves, time gameplay and give star rating
function moveCounter() {
	moves++;
	counter.innerHTML = moves;
	// start timer on first click
	if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
    // calculating rates based on moves
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

// @description implementation of game timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    }, 1000);
}

// @description function for congratulation modal after game completed successfully (all cards are matched) showing total moves, time and rating
function congratulations(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        //close icon on modal
        closeModal();
    };
}

// @description close icon on modal
function closeModal() {
	closeIcon.addEventListener("click", function(e) {
		modal.classList.remove("show");
		startGame();
	});
}

// @desciption for user to play Again 
function playAgain(){
    modal.classList.remove("show");
    startGame();
}

// @description loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
};
