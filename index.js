const red_ = "#F04248";
const orange_ = "#FBB637";
const blue_ = "#4190C8";
const purple_ = "#A078A5";
const green_ = "#6FB668";
const yellow_ = "#F9FF47";
const gray_ = "#797D81";

function toHEX(color){
	if (color == "red"){
		return red_;
	}
	else if (color == "orange") {
		return orange_;
	}
	else if (color == "blue") {
		return blue_;
	}
	else if (color == "purple") {
		return purple_;
	}
	else if (color == "green") {
		return green_;
	}
	else if (color == "yellow") {
		return yellow_;
	}
	else if (color == "gray") {
		return gray_;
	}
}

function startup(){
	document.getElementById("loadingSound").play();
	addFade("red", "redFade")
	addFade("orange", "orangeFade")
	addFade("blue", "blueFade")
	addFade("purple", "purpleFade")
	addFade("green", "greenFade")
	addFade("yellow", "yellowFade")
	secondaryFade("messageBoard")
	secondaryFade("decisionBoard")
	window.removeEventListener("click", startup);
}

function addFade(id, fadeclass){
	let obj = document.getElementById(id);
	obj.style.webkitAnimationName = fadeclass;
	obj.style.webkitAnimationDuration = "2.3s";
	obj.style.opacity = 1;	
}

function secondaryFade(id){
	let obj = document.getElementById(id);
	obj.style.webkitAnimationName = "lateFade";
	obj.style.webkitAnimationDuration = "4.6s";
	obj.style.opacity = 1;
}



class Game{
	constructor(){
		this.jsonObj = null;
		this.score = 0;
		//The value of the governmental segments.
		this.rVal = 10;
		this.oVal = 10;
		this.bVal = 10;
		this.pVal = 10;
		this.gVal = 10;
		this.yVal = 10;
		this.currentCard = 0;
		this.currentDeck = ['1','2','3','4','5','6'];

		//Timing
		this.turnTimer = 30;
		this.timeLeft = 30;
		this.totalTime = 0;
		this.turnStart = 0;
		this.clock = null;
	}

	timing(){
		//Begin the timer
		var start = Date.now();
		this.turnStart = start;
		this.clock = setInterval(function() {
		    var delta = Math.floor((Date.now() - this.turnStart)/1000);
		    this.totalTime = Math.floor((Date.now() - start)/1000);
		    this.timeLeft = this.turnTimer - delta;
		    document.getElementById('timer').innerHTML = this.timeLeft;
		    document.getElementById('longTimer').innerHTML = this.totalTime;
		    if (this.timeLeft <= 0){
		    	this.rVal -= 1;
		    	this.oVal -= 1;
		    	this.bVal -= 1;
		    	this.pVal -= 1;
		    	this.gVal -= 1;
		    	this.yVal -= 1;
		    	this.timeLeft = this.turnTimer;
		    	this.turnStart = Date.now();
		    	this.update();
		    }
		}.bind(this), 1000);
	}

	cardRoutine(){
		let cardID = this.selectCard();
		this.currentCard = this.jsonObj.cards[cardID];
		this.displayCard(this.currentCard);
	}


	removeCard(card){
		let index = this.currentDeck.indexOf(card);
		if (index !== -1) {
  			this.currentDeck.splice(index, 1);
		}
		else{
			console.log("Tried to remove an element that did not exist!");
		}
	}

	addCard(card){
		this.currentDeck.push(card)
		console.log("Added card" + card);
	}

	selectCard(){
		let randomID = this.currentDeck[Math.floor(Math.random()*this.currentDeck.length)];
		return randomID;
	}

	displayCard(){
		//Set the prompt
		let promptObj = document.getElementById("prompt");
		let promptColor = this.currentCard.color;
		let promptText = this.currentCard.prompt;
		promptObj.innerHTML = "<p style='color:" + toHEX(promptColor) + "'>" + promptText + "</p>";

		//Set the buttons
		document.getElementById("decisionButtonl").style.backgroundColor = toHEX(this.currentCard.decisions.l);
		document.getElementById("decisionButtonm").style.backgroundColor = toHEX(this.currentCard.decisions.m);
		document.getElementById("decisionButtonr").style.backgroundColor = toHEX(this.currentCard.decisions.r);
	}

	update(){
		//Update HEXAGON visual
		this.updateBars('red','rVal');
		this.updateBars('orange','oVal');
		this.updateBars('blue','bVal');
		this.updateBars('purple','pVal');
		this.updateBars('green','gVal');
		this.updateBars('yellow','yVal');

		//
		//Addcard
		//Removecard
		//Calculate time points

		if (this.rVal == 0 || this.oVal == 0 || this.bVal == 0 || this.pVal == 0 || this.gVal == 0 || this.yVal == 0){
			//gameEnd
			clearInterval(this.clock);
			return;
		}
		else {
			this.cardRoutine();
		}
	}

	updateBars(color, value){
		let bar = document.getElementById(color);
		if (this[value] <= 10) {
			bar.style.opacity = .1 * this[value]
		}
		document.getElementById(value).innerHTML = this[value];
	}

	buttonHover(button){
		console.log(this.currentCard);
		document.getElementById("effectText").innerHTML = "<p>" + this.currentCard.effects[button].text + "</p>";
	}

	buttonClick(button){
		console.log(this.currentCard.effects[button].modifiers)
		let splitModifiers = this.currentCard.effects[button].modifiers.split(',');
		splitModifiers.forEach(function(element){
			//Parse out the sign of the string
			if(element[0] == "+"){
				this[element[2] + 'Val'] += parseInt(element[1]);
			}
			else if (element[0] == "-"){
				this[element[2] + 'Val'] += parseInt(element[1]);
			}
		}, this);

		//Reset timers
		this.timeLeft = this.turnTimer;
		this.turnStart = Date.now();
		this.update();
		
	}
}


$(document).ready(function() {
	window.addEventListener("click", startup);
	var game = new Game();

	$.getJSON("https://globalgig.github.io/HEXPIRE/data.json", function(data) {
		game.jsonObj = data;
		game.timing();
		game.cardRoutine();
		document.getElementById("decisionButtonl").addEventListener("mouseenter",function(){game.buttonHover("l")});
		document.getElementById("decisionButtonm").addEventListener("mouseenter",function(){game.buttonHover("m")});
		document.getElementById("decisionButtonr").addEventListener("mouseenter",function(){game.buttonHover("r")});
		document.getElementById("decisionButtonl").addEventListener("click",function(){game.buttonClick("l")});
		document.getElementById("decisionButtonm").addEventListener("click",function(){game.buttonClick("m")});
		document.getElementById("decisionButtonr").addEventListener("click",function(){game.buttonClick("r")});
 	});
});



