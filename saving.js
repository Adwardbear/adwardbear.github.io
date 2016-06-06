/*Pleae refer to Saving.txt for a full description on this lesson*/

function NewGame() {
	this.name = "Our Game";
	this.description = "Our Game's Description";
	this.numbers = [];
	for (var i=0;i<10;i++) {
		this.numbers[i] = i;
	}
}

var Game = new NewGame();

window.onload = function() {
	window.localStorage['SaveName'] = JSON.stringify(Game);
	
	window.GameTwo = JSON.parse(window.localStorage['SaveName']);
	
	document.getElementById("name").innerHTML = "Name: " + GameTwo.name;
	document.getElementById("desc").innerHTML = "Description: " + GameTwo.description;
	var numbers = "";
	for (var i=0;i<10;i++) {
		if (numbers.length == 0) {numbers = i;} else {numbers += ", " + i;}
	}
	document.getElementById("numbers").innerHTML = "Numbers: " + numbers;
}