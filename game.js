var money = 2; //increment this by one every click
var auto_money = 0; //automatically click once per second
var cost1 = 2;
var cost2 = 4; //the cost of this should increase exponentially


function update_total_money() {
    var e = document.getElementById("total_money");
    e.innerHTML = 'Money: ' + money;
}

document.getElementById("profit1").onclick =    function() {  
    if (money < cost1) {
        return alert('need more money.');
    }
    auto_money++; 
    money -= cost1;
    cost1 = Math.pow(2, auto_money);  
    var e = document.getElementById("money_per_second");
    e.innerHTML = 'Money per second: ' + auto_money; 
    var e2 = document.getElementById("profit1");
    e2.innerHTML = 'profit1 [PH] Cost: ' + cost1;
    update_total_money();
}

document.getElementById("profit2").onclick =    function() {  
    if (money < cost2) {
        return alert('need more money.');
    }
    auto_money++; 
    money -= cost2;
    cost2 = Math.pow(4, auto_money);  
    var e = document.getElementById("money_per_second");
    e.innerHTML = 'Money per second: ' + auto_money; 
    var e2 = document.getElementById("profit2");
    e2.innerHTML = 'profit2 [PH] Cost: ' + cost2;
    update_total_money();
}

setInterval(function () { 
    money += auto_money;
    update_total_money(); 
}, 1000); //once per second use the auto clickers

document.getElementById("help").onclick =    function() {
        return alert('profit1 cost x2 \nNews cost x4');
};