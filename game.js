var money = 0;
var Timer = window.setInterval(function(){Tick()}, 1000);

var Building1Name = "Lemonade Stand";
var Building1Cost = 10;
var Building1PerSec = 1;
var Building1Qty = 0;

var player = {
    money:money,
    Building1Qty:Building1Qty
}

function GatherMoney() {
	money = money + 1;
	document.getElementById("money").innerHTML = money;
}

function Tick() {
	money = money + (Building1Qty * Building1PerSec);
	document.getElementById("money").innerHTML = money;
}

function BuyLemonadeStand() {
	if (money >= Building1Cost) {
		money = money - Building1Cost;
		Building1Qty = Building1Qty + 1;
		document.getElementById("money").innerHTML = money;
		document.getElementById("Building1Qty").innerHTML = Building1Qty;
	}
}


//
//
//

 //Load in saved data

function load() {
    var result = localStorage.getItem("websitename");
    player = JSON.parse(result);
    if (typeof result.money !== "undefined") cookies = result.money;
    document.getElementById("money").innerHTML = result.money;
}

function save() {
    localStorage.setItem("websitename", JSON.stringify(player));        
}

function reset() {
    localStorage.removeItem("websitename");
    reload_view();
}    