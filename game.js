//Declaring variables
var player = {
    money: 1,
    building1Qty: 0,
    building1Cost: 1
}

function buyBuilding1() {
    player.building1Cost = Math.floor(1 * Math.pow(1.1,player.building1Qty));
    if(player.money >= player.building1Cost){
        player.building1Qty = player.building1Qty +1;
        player.money = player.money - player.building1Cost;
        updateScreen();
    }
    player.building1Cost = Math.floor(1 * Math.pow(1.1,player.building1Qty));
    updateScreen();
}

function runBuilding1() {
    console.log('Command runBuilding1()');
    console.log('btn disabled');
    document.getElementById("runBuilding1").disabled = true; 
    console.log('Timeout 10 seconds');
    setTimeout(building1Money,10000);
    console.log('bar running');
    var elem = document.getElementById("bar1");   
    var width = 1;
    console.log('Bar set at 100frames');
    var id = setInterval(frame, 100);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++; 
        elem.style.width = width + '%'; 
          
    }
  }
console.log('command complete');

}

function building1Money() {
    console.log('player.money++');
    player.money++;
    console.log('btn enabled');
    document.getElementById("runBuilding1").disabled = false; 
    updateScreen();
}

function runBuilding2() {
    console.log('Command runBuilding2()');
    console.log('btn disabled');
    document.getElementById("runBuilding2").disabled = true; 
    console.log('Timeout 10 seconds');
    setTimeout(building2Money,10000);
    console.log('bar running');
    var elem = document.getElementById("bar2");   
    var width = 1;
    console.log('Bar set at 100frames');
    var id = setInterval(frame, 100);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++; 
        elem.style.width = width + '%'; 
          
    }
  }
console.log('command complete');

}


function building2Money() {
    console.log('player.money++');
    player.money = player.money + 10;
    console.log('btn enabled');
    document.getElementById("runBuilding2").disabled = false; 
    updateScreen();
}


//Loading and saving
function saveGame() {
    localStorage.setItem("gameSave", JSON.stringify(player));
    console.log('saved');
}

function loadGame() {
    var result = localStorage.getItem("gameSave");
    player = JSON.parse(result);
    console.log('loaded');
    updateScreen();
}

function reset() {
    localStorage.removeItem("gameSave");
    window.location.reload();
}

if(localStorage.getItem("gameSave") === null){
    saveGame();
} else {
    loadGame();
}


//Starting game logic
function updateScreen() {
    document.getElementById("money").innerHTML = player.money;
    document.getElementById("building1Qty").innerHTML = player.building1Qty;
    document.getElementById("building1Cost").innerHTML = player.building1Cost;
    //$("#metal").html(player.metal);
    //$("#circuit").html(player.circuit);
    //$("#eps").html((player.generatorAmount * player.generatorConversions - (player.metalPerSecond * player.basicRobotConversions) * 2) - (player.circuitPerSecond * player.basicFactoryConversions) * 4);
    //$("#mps").html(player.metalPerSecond * player.basicRobotConversions);
    //$("#cps").html(player.circuitPerSecond * player.basicFactoryConversions);
    //$("#energyPerCrankClick").html(player.energyAtOnce);
}
