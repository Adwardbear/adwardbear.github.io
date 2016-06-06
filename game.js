/*Pleae refer to Lesson 9.txt for a full description on this lesson*/

//The timer to run code every second
var Timer = window.setInterval(function(){Tick()}, 1000);
var buildings = [];

//The object declaration for game saves
function GameSave() {
	this.money = 0;
	this.buildings = [];
	for (var i = 0;i < buildings.length;i++) {
		this.buildings[i] = 0;
	}
}

//The object declaration for buildings
function Building() {
	this.Name = "Lemonade Stand";
	this.Cost = 10;
	this.PerSec = 1;
}

//The function to initialise all buildings
function InitBuildings() {
	LoadBuilding("Lemonade Stand",10,1);
}

//The function to automatically load a building into the buildings array
function LoadBuilding(name,cost,persec) {
	var cur = buildings.length;
	
	buildings[cur] = new Building();
	buildings[cur].Name = name;
	buildings[cur].Cost = cost;
	buildings[cur].PerSec = persec;
}

//The function used to gather money
function GatherMoney() {
	game.money++; //++ tells javascript to add 1 to the variable
	
	//Display the player's current money
	document.getElementById("money").innerHTML = game.money;
}

//The function that gets run every second
function Tick() {
	for (var i = 0;i < buildings.length;i++) {
		game.money += game.buildings[i] * buildings[i].PerSec;
	}
	document.getElementById("money").innerHTML = game.money;
}

//The function to buy a lemonade stand
function Build(id) {
	if (game.money >= buildings[id].Cost) { //Check if the player has enough money, then subtract it and add a new building if they do
		game.money -= buildings[id].Cost;
		game.buildings[id] = game.buildings[id] + 1;
		document.getElementById("money").innerHTML = game.money;
		document.getElementById("Building1Qty").innerHTML = game.buildings[id];
	}
}

function save(savetype){
	//Create objects and populate them with the variables, these will be stored in cookies
	//Each individual cookie stores only ~4000 characters, therefore split currently across two cookies
	//Save files now also stored in localStorage, cookies relegated to backup
	saveVar = {
		money:money
	}
	saveVar2 = {
		land:land,
		wonder:wonder,
		tent:tent,
		whut:whut,
		cottage:cottage,
		house:house,
		mansion:mansion,
		barn:barn,
		woodstock:woodstock,
		stonestock:stonestock,
		tannery:tannery,
		smithy:smithy,
		apothecary:apothecary,
		temple:temple,
		barracks:barracks,
		stable:stable,
		mill:mill,
		graveyard:graveyard,
		fortification:fortification,
		battleAltar:battleAltar,
		fieldsAltar:fieldsAltar,
		underworldAltar:underworldAltar,
		catAltar:catAltar,
		resourceClicks:resourceClicks,
		worksafe:worksafe,
	}
	//Create the cookies
	bake_cookie('ad',saveVar);
	bake_cookie('ad2',saveVar2);
	//set localstorage
	try {
		localStorage.setItem('ad', JSON.stringify(saveVar));
		localStorage.setItem('ad2', JSON.stringify(saveVar2));
	} catch(err) {
		console.log('Cannot access localStorage - browser may be old or storage may be corrupt')
	}
	//Update console for debugging, also the player depending on the type of save (manual/auto)
	console.log('Attempted save');
	if (savetype == 'export'){
		var string = '[' + JSON.stringify(saveVar) + ',' + JSON.stringify(saveVar2) + ']';
		var compressed = LZString.compressToBase64(string);
		console.log('Compressing Save');
		console.log('Compressed from ' + string.length + ' to ' + compressed.length + ' characters');
		document.getElementById('impexpField').value = compressed;
		gameLog('Saved game and exported to base64');
	}
	if ((read_cookie('ad') && read_cookie('ad2')) || (localStorage.getItem('ad') && localStorage.getItem('ad2'))){
		console.log('Savegame exists');
		if (savetype == 'auto'){
			console.log('Autosave');
			gameLog('Autosaved');
		} else if (savetype == 'manual'){
			alert('Game Saved');
			console.log('Manual Save');
			gameLog('Saved game');
		}
		_gaq.push(['_trackEvent', 'AdClicker', 'Save', savetype]);
	};
	try {
		xmlhttp = new XMLHttpRequest();
		xmlhttp.overrideMimeType('text/plain');
		xmlhttp.open("GET", "version.txt?r=" + Math.random(),true);
		xmlhttp.onreadystatechange=function() {
			if (xmlhttp.readyState==4) {
				var sVersion = parseInt(xmlhttp.responseText);
				if (version < sVersion){
					versionAlert();
				}
			}
		}
		xmlhttp.send(null)
	} catch (err) {
		console.log('XMLHttpRequest failed')
	}
}

// Load in saved data

function load(loadType){
	//define load variables
	var loadVar = {},
		loadVar2 = {};
		
	if (loadType == 'cookie'){
		//check for cookies
		if (read_cookie('ad') && read_cookie('ad2')){
			//set variables to load from
			loadVar = read_cookie('ad');
			loadVar2 = read_cookie('ad2');
			//notify user
			gameLog('Loaded saved game from cookie');
			gameLog('Save system switching to localStorage.');
		} else {
			console.log('Unable to find cookie');
			return false;
		};
	}
	
	if (loadType == 'localStorage'){
		//check for local storage
		try {
			string1 = localStorage.getItem('ad');
			string2 = localStorage.getItem('ad2');
		} catch(err) {
			console.log('Cannot access localStorage - browser may not support localStorage, or storage may be corrupt')
		}
		if (string1 && string2){
			loadVar = JSON.parse(string1);
			loadVar2 = JSON.parse(string2);
			//notify user
			gameLog('Loaded saved game from localStorage')
		} else {
			console.log('Unable to find variables in localStorage. Attempting to load cookie.')
			load('cookie');
			return false;
		}
	}

//Run this code once the page has loaded fully
window.onload = function() {
	InitBuildings();
	window.game = new GameSave();
    var savegame = JSON.parse(localStorage.getItem("save"));
};