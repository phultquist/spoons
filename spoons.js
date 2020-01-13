var numplayers = 10;
var cards = [];
var players = [];
var cardsInPile;
var cardsOnTable;
var cardsInGarbage = [];
var wins = new Array(numplayers).fill(0);
var numDeadGames = 0;
//cards are 1: ACE, 2: 2 ... 11: JACK, 12: QUEEN, 13: KING

var winner = null;
var roundsPerGame = [];

function playGame(){
	var numRounds = 0;
	while (winner == null){
		if (numRounds > 1000) {
			console.log("Dead Game");
			numDeadGames ++;
			return;
		}
		numRounds ++
		playRound();
	}
	wins[winner] ++;
	roundsPerGame.push(numRounds);
}

function calcAverageRoundsPerGame(){
	return calcTotalRounds()/roundsPerGame.length;
}

function calcSmallestNumRounds(){
	return Math.min.apply(Math, roundsPerGame)
}

function calcGreatestNumRounds(){
	return Math.max.apply(Math, roundsPerGame)
}

function calcTotalRounds(){
	var sum = 0;
	for (r in roundsPerGame) sum += roundsPerGame[r];
	return sum;
}

function simulate(n){
	for (w = 0; w < n; w++){
		if (w % (n/10) == 0){
			console.log(w);
		}
		newGame();
		playGame();
	}
	var wintable = [];
	for (h in wins){
		wintable.push({
			numWins: wins[h],
			percent: wins[h]/roundsPerGame.length
		});
	}
	console.table(wintable);
	console.log("Average Rounds Per Game: "+calcAverageRoundsPerGame());
}

function newGame(){
	winner = null;
	cards = [];
	players = [];
	cardsInGarbage = [];
	cardsOnTable = new Array(numplayers).fill(null);

	for (i = 1; i <= 13; i++){
		for (j = 0; j < 4; j++) {
			cards.push(new Card(i));
		}
	}

	var tempcards = shuffle(cards);

	var hand;
	for (p = 0; p < numplayers; p++){
		hand = [];
		for (k = 0; k < 4; k++){
			// hand.push(tempcards.splice(p*4 + k, 1)[0]);
			hand.push(tempcards.pop());
		}
		players.push(new Player(p, hand));
	}

	cardsInPile = tempcards;
}

function playRound(){
	if (cardsInPile.length == 0){
		cardsInPile = shuffle(cardsInGarbage);
		cardsInGarbage = [];
	}
	cardsOnTable[1] = players[0].run(cardsInPile.shift());
	for (m = 1; m < numplayers - 1; m++){
		if (cardsOnTable[m] !== null) cardsOnTable[m + 1] = players[m].run(cardsOnTable[m]);
	}
	if (cardsOnTable[numplayers - 1] !== null){
		cardsInGarbage.push(players[numplayers - 1].run(cardsOnTable[numplayers - 1]));
	}
}

class Card{
	constructor(type){
		this.type = type;
	}
}

class Player{
	constructor(number, hand){ //0: dealing player, numplayers - 1: garbage player
		this.number = number;
		this.hand = hand;
	}

	run(newCard){
		var counts = new Array(13).fill(0); //numbers of each card in hand 0 Aces, 1 2, 0 3's ... 2 10's

		this.hand.push(newCard);

		for (var card of this.hand){
			counts[card.type - 1] ++;
		}

		var dead;

		if (counts[newCard.type - 1] == 1) {
			dead = this.hand.pop();
			return dead;
		} else {
			var minCount = smallestNaturalNumber(counts);
			if (largestNaturalNumber(counts) == 4){
				winner = this.number;
				// console.log(this.number + " WON");
				return true;
			}

			var deadCardType = shuffle(getAllIndexes(counts, minCount))[0] + 1;

			for (var c in this.hand){
				if (this.hand[c].type == deadCardType){
					dead = this.hand.splice(c, 1)[0];
					return dead;
				}
			}
		}
	}
}

smallestNaturalNumber = function( array ){
	var min = 4;
  for (var u in array){
		if (array[u] < min && array[u] != 0){
			min = array[u];
		}
	}
	return min;
};

largestNaturalNumber = function( array ){
	var max = 0;
  for (var y in array){
		if (array[y] > max && array[y] != 0){
			max = array[y];
		}
	}
	return max;
};

function random(max) {
   return Math.floor(Math.random() * max);
}

function shuffle(array) {
	array.sort(() => Math.random() - 0.5);
	return array;
}

function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}
