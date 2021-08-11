const red_ = "#F04248";
const orange_ = "#FBB637";
const blue_ = "#4190C8";
const purple_ = "#A078A5";
const green_ = "#6FB668";
const yellow_ = "#F9FF47";
const gray_ = "#797D81";
var jsonObj = null;

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

	cardID = "card1";
	card = jsonObj.cards[cardID];
	displayCard(card);
	//cardRoutine
	document.getElementById("decisionButtonl").addEventListener("mouseenter", function(){buttonHover("l", card)});
	document.getElementById("decisionButtonm").addEventListener("mouseenter",function(){buttonHover("m", card)});
	document.getElementById("decisionButtonr").addEventListener("mouseenter",function(){buttonHover("r", card)});
}

function addFade(id, fadeclass){
	obj = document.getElementById(id);
	obj.style.webkitAnimationName = fadeclass;
	obj.style.webkitAnimationDuration = "2.3s";
	obj.style.opacity = 1;	
}

function secondaryFade(id){
	obj = document.getElementById(id);
	obj.style.webkitAnimationName = "lateFade";
	obj.style.webkitAnimationDuration = "4.6s";
	obj.style.opacity = 1;
}

function removeCard(card){

}

function addCard(card){

}

function selectCard(card){

}

function displayCard(card){
	//Set the prompt
	promptObj = document.getElementById("prompt");
	promptColor = card.color;
	promptText = card.prompt;
	promptObj.innerHTML = "<p style='color:" + toHEX(promptColor) + "'>" + promptText + "</p>";

	//Set the buttons
	document.getElementById("decisionButtonl").style.backgroundColor = toHEX(card.decisions.l);
	document.getElementById("decisionButtonm").style.backgroundColor = toHEX(card.decisions.m);
	document.getElementById("decisionButtonr").style.backgroundColor = toHEX(card.decisions.r);
}

function updateBars(){

}

function buttonHover(button, card){
	console.log("why?")
	document.getElementById("effectText").innerHTML = "<p>" + card.effects[button].text + "</p>";
}


$(document).ready(function() {
	window.addEventListener("click", startup);
	$.getJSON("https://globalgig.github.io/HEXPIRE/data.json", function(data) {
		jsonObj = data;
 	});
});