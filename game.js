var version = 1;

//
//
//

/*Pleae refer to Lesson 1.txt for a full description on this lesson*/

//The timer to run code every second
var Timer = window.setInterval(function(){Tick()}, 1000);
var money = 0

//The object declaration for game saves
function GameSave() {
	this.money = 0;
}

//The object declaration for buildings
function Building() {
	this.Name = "Lemonade Stand";
	this.Cost = 10;
	this.PerSec = 1;
	this.Qty = 0;
}

//The function used to gather money
function GatherMoney() {
	game.money++; //++ tells javascript to add 1 to the variable
    money++;
	
	//Display the player's current money
	document.getElementById("money").innerHTML = game.money;
    document.getElementById("money2").innerHTML = money;
}

//The function that gets run every second
function Tick() {
	game.money += Building1.Qty * Building1.PerSec;
	document.getElementById("money").innerHTML = game.money;
}

//The function to buy a lemonade stand
function BuyLemonadeStand() {
	if (game.money >= Building1.Cost) { //Check if the player has enough money, then subtract it and add a new building if they do
		game.money -= Building1.Cost;
		Building1.Qty = Building1.Qty + 1;
		document.getElementById("money").innerHTML = game.money;
		document.getElementById("Building1Qty").innerHTML = Building1.Qty;
	}
}

//Run this code once the page has loaded fully
window.onload = function() {
	window.Building1 = new Building();
	Building1.Name = "Lemonade Stand";
	Building1.Cost = 10;
	Building1.PerSec = 1;
	
	window.game = new GameSave();
};

//
//
//

 //Load in saved data

function load() {
    var result = localStorage.getItem("websitename");
    GameSave = JSON.parse(result);
    
}

function save() {
    localStorage.setItem("websitename", JSON.stringify(GameSave));   
}

function reset() {
    localStorage.removeItem("websitename");
    reload_view();
}    

//function deleteSave(){
//	Deletes the current savegame by setting the game's cookies to expire in the past.
//	var really = confirm('Really delete save?'); //Check the player really wanted to do that.
//	if (really){
//        document.cookie = ['ad', '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.', window.location.host.toString()].join('');
//		document.cookie = ['ad2', '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.', window.location.host.toString()].join('');
//		localStorage.removeItem('ad');
//		localStorage.removeItem('ad2');
//	}
//}



//function reset(){
	//Resets the game, keeping some values but resetting most back to their initial values.
	//var really = confirm('Really reset? You will keep past deities and wonders (and cats)'); //Check player really wanted to do that.
	//if (really){
	//	if (upgrades.deity == 1){
	//		if (oldDeities){
	//			//Relegates current deity to the oldDeities table.
	//			if (deity.type){
	//				deity.type = ', deity of ' + deity.type
	//			};
	//			append = oldDeities;
				//Sets oldDeities value
	//			oldDeities = '<tr id="deity' + deity.seniority + '"><td><strong><span id="deity' + deity.seniority + 'Name">' + deity.name + '</span></strong><span id="deity' + deity.seniority + 'Type" class="deityType">' + deity.type + '</span></td><td>Devotion: <span id="devotion' + deity.seniority + '">' + deity.devotion + '</span></td><td class="removeDeity"><button class="removeDeity" onclick="removeDeity(deity' + deity.seniority + ')">X</button></td></tr>' + append;
	//			//document.getElementById('activeDeity').innerHTML = '<tr id="deity' + (deity.seniority + 1) + '"><td><strong><span id="deity' + (deity.seniority + 1) + 'Name">No deity</span></strong><span id="deity' + (deity.seniority + 1) + 'Type" class="deityType"></span></td><td>Devotion: <span id="devotion' + (deity.seniority + 1) + '">0</span></td><td class="removeDeity"><button class="removeDeity" onclick="removeDeity(deity' + (deity.seniority + 1) + ')">X</button></td></tr>'
	//		} else {
	//			deityArray.push([deity.seniority,deity.name,deity.type,deity.devotion]);
	//		};
	//		document.getElementById('activeDeity').innerHTML = '<tr id="deity' + (deity.seniority + 1) + '"><td><strong><span id="deity' + (deity.seniority + 1) + 'Name">No deity</span></strong><span id="deity' + (deity.seniority + 1) + 'Type" class="deityType"></span></td><td>Devotion: <span id="devotion' + (deity.seniority + 1) + '">0</span></td><td class="removeDeity"><button class="removeDeity" onclick="removeDeity(deity' + (deity.seniority + 1) + ')">X</button></td></tr>'
	//		deity.seniority += 1;
	//		document.getElementById('deitySpecialisation').style.display = 'none';
	//	};
		
	//	food = {
	//		name:"food",
	//		total:0,
	//		increment:1,
	//		specialchance:0.1
	//	}
	//	wood = {
	//		name:"wood",
	//		total:0,
	//		increment:1,
	//		specialchance:0.1
	//	}
	//	stone = {
	//		name:"stone",
	//		total:0,
	//		increment:1,
	//		specialchance:0.1
	//	}

  //      gameLog('Game Reset'); //Inform player.
	//}
//}

/* Timed functions */




/* UI functions */



