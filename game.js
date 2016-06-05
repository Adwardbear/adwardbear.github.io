var clicks = 2; //increment this by one every click
var auto_clicks = 0; //automatically click once per second
var cost = 2; //the cost of this should increase exponentially


function update_total_clicks() {
    var e = document.getElementById("total_clicks");
    e.innerHTML = 'Clicks: ' + clicks;
}

document.getElementById("click").onclick =    function() {  
    clicks++; 
    update_total_clicks(); //updates the text
};
document.getElementById("buy_click").onclick =    function() {  
    if (clicks < cost) {
        return alert('need more money.');
    }
    auto_clicks++; 
    clicks -= cost;
    cost = Math.pow(2, auto_clicks);  
    var e = document.getElementById("clicks_per_second");
    e.innerHTML = 'Clicks per second: ' + auto_clicks; 
    var e2 = document.getElementById("buy_click");
    e2.innerHTML = 'Newspaper stand [PH] ' + cost;
    update_total_clicks();
};

setInterval(function () { 
    clicks += auto_clicks;
    update_total_clicks(); 
}, 1000); //once per second use the auto clickers
