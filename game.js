var money = 1; //increment this by one every click
var auto_clicks = 0; //automatically click once per second
var cost = 1; //the cost of this should increase exponentially


function update_total_money() {
    var e = document.getElementById("total_money");
    e.innerHTML = 'Money: ' + money;
}

document.getElementById("profit1").onclick =    function() {  
    if (money < cost) {
        return alert('need more money.');
    }
    auto_clicks++; 
    money -= cost;
    cost = Math.pow(2, auto_clicks);  
    var e = document.getElementById("MPS");
    e.innerHTML = 'Money per second: ' + auto_clicks; 
    var e2 = document.getElementById("profit1");
    e2.innerHTML = 'Profit1 - Cost: ' + cost;
    update_total_money();
};

setInterval(function () { 
    money += auto_clicks;
    update_total_money(); 
}, 10); //once per second use the auto clickers