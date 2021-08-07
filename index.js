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