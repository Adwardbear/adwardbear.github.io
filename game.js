
var cookies = 0;

function cookieClick(number){
    cookies = cookies + number;
    document.getElementById("cookies").innerHTML = cookies;
};

var cursors = 0;
var profit2 = 0;

function buyCursor(){
    var cursorCost = Math.floor(10 * Math.pow(1.1,cursors));     //works out the cost of this cursor
    if(cookies >= cursorCost){                                   //checks that the player can afford the cursor
        cursors = cursors + 1;                                   //increases number of cursors
    	cookies = cookies - cursorCost;                          //removes the cookies spent
        document.getElementById('cursors').innerHTML = cursors;  //updates the number of cursors for the user
        document.getElementById('cookies').innerHTML = cookies;  //updates the number of cookies for the user
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,cursors));       //works out the cost of the next cursor
    document.getElementById('cursorCost').innerHTML = nextCost;  //updates the cursor cost for the user
};

function buyProfit2(){
	var profit2Cost = Math.floor(10 * Math.pow(1.1,profit2));
	if(cookies >= profit2Cost){
		profit2 = profit2 + 1;
		cookies = cookies - profit2Cost;
		document.getElementById('profit2').innerHTML = profit2;
		document.getElementById('cookies').innerHTML = cookies;
	};
	var nextCost2 = Math.floor(10 * Math.pow(1,1,profit2));
	document.getElementById('profit2Cost').innerHTML = nextCost2;
};

window.setInterval(function(){
	
	cookieClick(cursors);
	cookieClick(profit2);
	
}, 1000);