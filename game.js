//Declaring variables
var player = {
    money: 1000,
    
    building1Qty: 0,
    building1Cost: 1,
    building1Man: false,
    building1ManCost: 1000,
    
    building2Qty: 0,
    building2Cost: 10
}

function buyBuilding1Man() {
    if(player.money >= player.building1ManCost){
        player.building1Man = true;
        player.money = player.money - player.building1ManCost;
        document.getElementById("buyBuilding1Man").disabled = true; 
        document.getElementById("runBuilding1").disabled = true; 
        updateScreen();
    }
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
    player.money = player.money + player.building1Qty;
    console.log('btn enabled');
    document.getElementById("runBuilding1").disabled = false; 
    updateScreen();
}

function buyBuilding2() {
    player.building2Cost = Math.floor(10 * Math.pow(1.2,player.building2Qty));
    if(player.money >= player.building2Cost){
        player.building2Qty = player.building2Qty +1;
        player.money = player.money - player.building2Cost;
        updateScreen();
    }
    player.building2Cost = Math.floor(10 * Math.pow(1.2,player.building2Qty));
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
    player.money = player.money + player.building2Qty * 2;
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
    updateScreen();
}

if(localStorage.getItem("gameSave") === null){
    saveGame();
    updateScreen();
} else {
    loadGame();
    updateScreen();
}


//Starting game logic
function updateScreen() {
    document.getElementById("money").innerHTML = player.money;
    
    //building 1
    if (player.building1Qty == 0) {
        document.getElementById("runBuilding1").disabled = true; 
    }else{
        document.getElementById("runBuilding1").disabled = false;
    }
    if (player.money <= 999) {
        document.getElementById("buyBuilding1Man").disabled = true; 
    }else{
        document.getElementById("buyBuilding1Man").disabled = false;
    }
    document.getElementById("building1Qty").innerHTML = player.building1Qty;
    document.getElementById("building1Cost").innerHTML = player.building1Cost;
    document.getElementById("label1").innerHTML = player.building1Qty;
    
    //building 2
    if (player.building2Qty == 0) {
        document.getElementById("runBuilding2").disabled = true; 
    }else{
        document.getElementById("runBuilding2").disabled = false;
    }
    document.getElementById("building2Qty").innerHTML = player.building2Qty;
    document.getElementById("building2Cost").innerHTML = player.building2Cost;
    document.getElementById("label2").innerHTML = player.building2Qty * 2;
    
}

window.setInterval(function(){
    updateScreen(),console.log("tick...")
},1000);

window.setInterval(function(){
    if (player.building1Man == true) {
        document.getElementById("buyBuilding1Man").disabled = true; 
        document.getElementById("runBuilding1").disabled = true; 
        runBuilding1();
        updateScreen();
        console.log("tick2...");
    }else{
        // do nothing.
    }
},10000);