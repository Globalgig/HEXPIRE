function startup(){
	document.getElementById("loadingSound").play();
	addFade("red", "redFade")
	addFade("orange", "orangeFade")
	addFade("blue", "blueFade")
	addFade("purple", "purpleFade")
	addFade("green", "greenFade")
	addFade("yellow", "yellowFade")
	window.removeEventListener("click", startup);
}

function addFade(id, fadeclass){
	obj = document.getElementById(id);
	obj.style.webkitAnimationName = fadeclass;
	obj.style.webkitAnimationDuration = "2.3s";
	obj.style.opacity = 1;	
}

window.addEventListener("click", startup);

function increment(){
	value = document.getElementById("theButton").value;
	value++;
	document.getElementById("theButton").innerHTML = value;
	document.getElementById("theButton").value = value;
}



/*
function timer(){
	while (true){
		console.log("Okay")
		setTimeout(test, 1000)
	}
}
*/