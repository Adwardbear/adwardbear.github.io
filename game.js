//Declaring variables
var player = {
    money: 1,
    totalMoney: 1
}

function moneyClick() {
    document.getElementById("clickClick").disabled = true; 
    console.log('btn disabled');
    console.log('bar running');
    var elem = document.getElementById("bar1");   
    var width = 10;
    var id = setInterval(frame, 25);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++; 
        elem.style.width = width + '%'; 
        document.getElementById("label").innerHTML = width * 1  + '%';
          
    }
  }
console.log('command complete');

}

function addMoney() {
    player.money++;
    console.log('player.money++');
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
    //$("#metal").html(player.metal);
    //$("#circuit").html(player.circuit);
    //$("#eps").html((player.generatorAmount * player.generatorConversions - (player.metalPerSecond * player.basicRobotConversions) * 2) - (player.circuitPerSecond * player.basicFactoryConversions) * 4);
    //$("#mps").html(player.metalPerSecond * player.basicRobotConversions);
    //$("#cps").html(player.circuitPerSecond * player.basicFactoryConversions);
    //$("#energyPerCrankClick").html(player.energyAtOnce);
}
