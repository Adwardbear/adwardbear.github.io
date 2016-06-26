//Adventure game inc
var bonus = {
    
}
var game = {
    
    //dice
    d4: 0,
    d6: 0,
    d8: 0,
    d10: 0,
    d12: 0,
    d20: 0,
    d100: 0,
    
    //stats
    turn: 0,
    kills: 0,
    HP: 1,
    MP: 1,
    
    //hidden evil stats
    EHP: 0,
    
    //reset bonus
    bonusDice: 0,
    bonusHP: 0,
    deaths: 0,
    totalTurns: 0,
    totalKills: 0,
    
    //game messages
    text1: [
        "Walk out of house",
        "holy sh- it worked",
    ],
    text2: [
        "You encountered a goblin!",
        "You encountered Prototype Boss!",
        "message 3",
        "message 3",
        "message 4",
        "message 5",
        "message 6",
        "message 7",
        "message 8",
        "message 9",
        "message 10",
    ]
}
//auto load
window.onload=function() {
    if(localStorage.getItem("gameSave") === null){
    gameSave();
    updateScreen();
} else {
    gameLoad();
    updateScreen();
}
}

//Game
function gameMessage() {
    game.turn++
    game.totalTurns++
    document.getElementById("gameText").innerHTML = game.text1[0];
    
    rollDice10();
    if (game.d10 > 1) {
        document.getElementById("gameText2").innerHTML = "Great, you made it";
        document.getElementById( "gameMessage" ).setAttribute( "onclick", "javascript: gameMessage2();" );
        //Set EHP BEFORE next event to prevent ehp resetting
        game.EHP = 4;
    } else {
        document.getElementById("gameText2").innerHTML = "You tripped. Try again.";
        game.HP--
        hitPoints();
    }
}
function gameMessage2() {
    game.turn++
    game.totalTurns++
    document.getElementById("gameText").innerHTML = game.text2[0];
    rollDice4();
    if (game.d4 > 1) {
        game.EHP--
        if (game.EHP < 1) {
            game.kills++;
            game.totalKills++;
            document.getElementById("gameText2").innerHTML = "evil dead";
            document.getElementById( "gameMessage" ).setAttribute( "onclick", "javascript: gameMessage3();" );
            game.EHP = 10;
        } else {
            document.getElementById("gameText2").innerHTML = "You deal 1 damage to evil! " + game.EHP + " HP left!";
        }
    } else {
        game.HP--
        document.getElementById("gameText2").innerHTML = "You take 1 damage! " + game.HP + " HP left!";
        hitPoints();
    }
}

function gameMessage3() {
    game.turn++
    game.totalTurns++
    document.getElementById("gameText").innerHTML = game.text2[1];
    rollDice6();
    if (game.d6 > 3) {
        game.EHP--
        if (game.EHP < 1) {
            game.kills++;
            game.totalKills++;
            document.getElementById("gameText2").innerHTML = "evil dead";
            window.alert("You win!\nThanks for trying the prototype of my game!\n\nHere are the stats for your run!\n\nTotal turns: " + game.totalTurns + "\nTotal kills: " + game.totalKills + "\nTotal Deaths: " + game.deaths);
            //document.getElementById( "gameMessage" ).setAttribute( "onclick", "javascript: gameMessage3();" );
        } else {
            document.getElementById("gameText2").innerHTML = "You deal 1 damage to evil! " + game.EHP + " HP left!";
        }
    } else {
        game.HP--
        document.getElementById("gameText2").innerHTML = "You take 1 damage! " + game.HP + " HP left!";
        hitPoints();
    }
}



function hitPoints() {
    updateScreen();
    if (game.HP < 1) {
        game.bonusHP++
        gameOver();
    } else {
        //do nothing
    }
}

function gameOver() {
    window.alert("Game Over!\nYou lasted " + game.turn + " turns!\n\n You gained 1 bonus HP!");
    //code to grab turns before reset
    game.turn = 0;
    game.d4 = 0;
    game.d6 = 0;
    game.d8 = 0;
    game.d10 = 0;
    game.d12 = 0;
    game.d20 = 0;
    game.d100 = 0;
    game.kills = 0;
    game.HP = 1 + game.bonusHP;
    game.deaths++
    
    gameSave();
    gameReset();
    updateScreen();
}

function gameSave() {
    localStorage.setItem("gameSave", JSON.stringify(game));
    console.log('saved');
}

function gameLoad() {
    var result = localStorage.getItem("gameSave");
    game = JSON.parse(result);
    console.log('loaded');
    updateScreen();
}

function gameReset() {
    //code to grab turns before reset
    game.turn = 0;
    game.d4 = 0;
    game.d6 = 0;
    game.d8 = 0;
    game.d10 = 0;
    game.d12 = 0;
    game.d20 = 0;
    game.d100 = 0;
    game.kills = 0;
    
    window.location.reload();
}

function gameHardReset() {
    localStorage.removeItem("gameSave");
    window.location.reload();
    updateScreen();
}



//roll dice
function rollDice4() {
    console.log("rolling d4");
    game.d4 = Math.floor(Math.random() * 4) + 1;
    console.log("you rolled: " + game.d4)
    updateScreen()
}
function rollDice6() {
    console.log("rolling d6");
    game.d6 = Math.floor(Math.random() * 6) + 1;
    console.log("you rolled: " + game.d6)
    updateScreen()
}
function rollDice8() {
    console.log("rolling d8");
    game.d8 = Math.floor(Math.random() * 8) + 1;
    console.log("you rolled: " + game.d8)
    updateScreen()
}
function rollDice10() {
    console.log("rolling d10");
    game.d10 = Math.floor(Math.random() * 10) + 1;
    console.log("you rolled: " + game.d10)
    updateScreen()
}
function rollDice12() {
    console.log("rolling d12");
    game.d12 = Math.floor(Math.random() * 12) + 1;
    console.log("you rolled: " + game.d12)
    updateScreen()
}
function rollDice20() {
    console.log("rolling d20");
    game.d20 = Math.floor(Math.random() * 20) + 1;
    console.log("you rolled: " + game.d20)
    updateScreen()
}
function rollDice100() {
    console.log("rolling d100");
    game.d100 = Math.floor(Math.random() * 100) + 1;
    console.log("you rolled: " + game.d100)
    updateScreen()
}

//screen update
function updateScreen() {
    document.getElementById("d4").innerHTML = game.d4;
    document.getElementById("d6").innerHTML = game.d6;
    document.getElementById("d8").innerHTML = game.d8;
    document.getElementById("d10").innerHTML = game.d10;
    document.getElementById("d12").innerHTML = game.d12;
    document.getElementById("d20").innerHTML = game.d20;
    document.getElementById("d100").innerHTML = game.d100;
    document.getElementById("turn").innerHTML = game.turn;
    document.getElementById("kills").innerHTML = game.kills;
    document.getElementById("HP").innerHTML = game.HP;
    document.getElementById("MP").innerHTML = game.MP;
    document.getElementById("bonusDice").innerHTML = game.bonusDice;
    document.getElementById("bonusHP").innerHTML = game.bonusHP;
    document.getElementById("EHP").innerHTML = game.EHP;
    document.getElementById("deaths").innerHTML = game.deaths;
    document.getElementById("totalTurns").innerHTML = game.totalTurns;
    document.getElementById("totalKills").innerHTML = game.totalKills;
}