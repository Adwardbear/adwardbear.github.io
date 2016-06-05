var money = 1; //increment this by one every click
var auto1 = 0; //automatically click once per second
var cost1 = 1; //the cost of this should increase exponentially


function update_total_money() {
    var e = document.getElementById("total_money");
    e.innerHTML = 'Money: ' + money;
}

document.getElementById("profit1").onclick =    function() {  
    if (money < cost1) {
        return alert('need more money.');
    }
    auto1++; 
    money -= cost1;
    cost1 = Math.pow(2, auto1);  
    var e = document.getElementById("MPS");
    e.innerHTML = 'Money per second: ' + auto1; 
    var e2 = document.getElementById("profit1");
    e2.innerHTML = 'Profit1 - Cost: ' + cost1;
    update_total_money();
};

setInterval(function () { 
    money += auto1;
    update_total_money(); 
}, 10); //once per second use the auto clickers