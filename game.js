var clicks = 1; //increment this by one every click
var auto_clicks = 0; //automatically click once per second
var cost = 1; //the cost of this should increase exponentially


function update_total_money() {
    var e = document.getElementById("total_money");
    e.innerHTML = 'Clicks: ' + clicks;
}

document.getElementById("profit1").onclick =    function() {  
    if (clicks < cost) {
        return alert('need more clicks.');
    }
    auto_clicks++; 
    clicks -= cost;
    cost = Math.pow(2, auto_clicks);  
    var e = document.getElementById("clicks_per_second");
    e.innerHTML = 'Clicks per second: ' + auto_clicks; 
    var e2 = document.getElementById("profit1");
    e2.innerHTML = 'Profit1 - Cost: ' + cost;
    update_total_clicks();
};

setInterval(function () { 
    clicks += auto_clicks;
    update_total_money(); 
}, 10); //once per second use the auto clickers