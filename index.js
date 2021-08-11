const red = "#F04248";
const orange = "#FBB637";
const blue = "#4190C8";
const purple = "#A078A5";
const green = "#6FB668";
const yellow = "#F9FF47";
const gray = "#797D81";

$(document).ready(function() {
	$.getJSON("https://globalgig.github.io/HEXPIRE/data.json", function(data) {
		const jsonObj = data;
 	});
});


function startup(){
	document.getElementById("loadingSound").play();
	addFade("red", "redFade")
	addFade("orange", "orangeFade")
	addFade("blue", "blueFade")
	addFade("purple", "purpleFade")
	addFade("green", "greenFade")
	addFade("yellow", "yellowFade")
	secondaryFade("messageBoard")
	window.removeEventListener("click", startup);
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

function removeCard(cardID){

}

function addCard(cardID){

}

function selectCard(cardID){

}

function displayCard(){

}

window.addEventListener("click", startup);