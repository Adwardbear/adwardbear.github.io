var money = 2; //increment this by one every click
var auto_money = 0; //automatically click once per second
var lcost = 2;
var cost = 4; //the cost of this should increase exponentially


function update_total_money() {
    var e = document.getElementById("total_money");
    e.innerHTML = 'Money: ' + money;
}

document.getElementById("lemon").onclick =    function() {  
    if (money < lcost) {
        return alert('need more money.');
    }
    auto_money++; 
    money -= lcost;
    lcost = Math.pow(2, auto_money);  
    var e = document.getElementById("money_per_second");
    e.innerHTML = 'Money per second: ' + auto_money; 
    var e2 = document.getElementById("lemon");
    e2.innerHTML = 'Lemonaid stand [PH] Cost: ' + lcost;
    update_total_money();
};

document.getElementById("newspaper").onclick =    function() {  
    if (money < cost) {
        return alert('need more money.');
    }
    auto_money++; 
    money -= cost;
    cost = Math.pow(4, auto_money);  
    var e = document.getElementById("money_per_second");
    e.innerHTML = 'Money per second: ' + auto_money; 
    var e2 = document.getElementById("newspaper");
    e2.innerHTML = 'Newspaper stand [PH] Cost: ' + cost;
    update_total_money();
};

setInterval(function () { 
    money += auto_money;
    update_total_money(); 
}, 1000); //once per second use the auto clickers

document.getElementById("help").onclick =    function() {
        return alert('Lemon cost x2 \n News cost x4');