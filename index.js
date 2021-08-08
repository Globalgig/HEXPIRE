function increment(){
	value = document.getElementById("theButton").value;
	value++;
	document.getElementById("theButton").innerHTML = value;
	document.getElementById("theButton").value = value;
}

window.onload = function() {
	alert("Okay!");
	document.getElementById("loadingSound").play();
}


window.addEventListener("click", function(event) {
    document.getElementById("loadingSound").play();
});



/*
function timer(){
	while (true){
		console.log("Okay")
		setTimeout(test, 1000)
	}
}
*/