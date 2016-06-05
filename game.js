var money = 1;
var auto1 = 0;
var cost1 = 1;

fuction update_total_money() {
	var e = document.getElementById("total_money");
	e.innerHTML = 'Money: ' + money;
}

document.getElementById("profit1").onclick = function() {
	if (money < cost1) {
		return alert('Need more money.');
	}
	auto1++;
	money -= cost1;
	cost1 = Math.pow(2, auto1);
	var e = document.getElementById("MPS");
	e.innerHTML = 'MPS: ' + auto1;
	var e2 = document.getElementById("profit1");
	e2.innerHTML = 'Profit1 - Cost: ' + cost1;
	update_total_money();
};

setInterval(function () {
	money += auto1;
	update_total_money();
}, 1000);