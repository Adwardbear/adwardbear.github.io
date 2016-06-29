//Adventure game inc
var bonus = {
    
}

var goblin = {
    HP: 10, 
}
var goblin2 = {
    HP: 12,
}
var char ={
    one: 0,
    two: 0,
    three: 0,
    four: 0,
}

var game = {
    
    //0 = btns disabled
    //1 = tut complete
    //2 = in combat (gen dis, fight enb)
    progress: 0,
    
    playerName: "",
    HP: 0,
    MP: 0,
    
    LVL: 1,
    EXP: 0,
    maxEXP: 50,
    mobEXP: 0,
    statPoints: 0,
    
    STR: 0,
    DEX: 0,
    CON: 0,
    INT: 0,
    WIS: 0,
    CHA: 0,
    
    AC: 10,
    //dice
    d4: 0,
    d6: 0,
    d8: 0,
    d10: 0,
    d12: 0,
    d20: 0,
    d100: 0,
    
    eD4: 0,
    eD6: 0,
    eD8: 0,
    eD10: 0,
    eD12: 0,
    eD20: 0,
    eD100: 0,
    //stats
    turn: 0,
    kills: 0,
    
    //hidden evil stats
    EHP: 0,
    eLVL: 0,
    eAC: 0,
    
    //reset bonus
    bonusDice: 0,
    bonusHP: 0,
    deaths: 0,
    totalTurns: 0,
    totalKills: 0,
    
    //game messages
    text1: [
        "Fumble Check.",
        "The game works by rolling dice behind the screens.",
        "You need to NOT roll a 1!",
        "Great, you didn't fumble.",
        "Oh dear, you fumbled, try again. (-1HP)"
    ],
    text2: [
        "You encountered a Goblin!",
        "You encountered a Vampire!",
        "You encountered a Ghoul!",
        "You encountered a Cyclops!",
        "You encountered a Giant Rat!",
        "You encountered a Giant Arachnid!",
        "You encountered a Slime!",
        "You encountered a G-g-g-g-host!",
        "You encountered a Witch!",
        "You encountered a Glitch!",
        "MissinNo! Creature for this ID has not been created yet",
    ],
    battleText1: [
        "You hit!",
        "You miss!",
        "Evil hit!",
        "Evil miss!",
        "",
    ],
    battleMiss: [
        "Slipped...",
    ],
    trapText: [
        "DEX Check",
    ]
    
}
//auto load
window.onload=function() {
    if(localStorage.getItem("gameSave") === null){
        document.getElementById("fightBattle").disabled = true;
        document.getElementById("encounterGen").disabled = true;
        game.playerName = window.prompt("Username");
        document.getElementById("playerName").innerHTML = game.playerName;
        //Roll STR
        console.log("Rolling STR");
        rollDice6();
        char.one = game.d6;
        rollDice6();
        char.two = game.d6;
        rollDice6();
        char.three = game.d6;
        rollDice6();
        char.four = game.d6;
        console.log("Removing: "+Math.min(char.one, char.two, char.three, char.four));
        game.STR = char.one+char.two+char.three+char.four-Math.min(char.one, char.two, char.three, char.four);
        //Roll DEX
        console.log("Rolling DEX");
        rollDice6();
        char.one = game.d6;
        rollDice6();
        char.two = game.d6;
        rollDice6();
        char.three = game.d6;
        rollDice6();
        char.four = game.d6;
        console.log("Removing: "+Math.min(char.one, char.two, char.three, char.four));
        game.DEX = char.one+char.two+char.three+char.four-Math.min(char.one, char.two, char.three, char.four);
        //Roll CON
        console.log("Rolling CON");
        rollDice6();
        char.one = game.d6;
        rollDice6();
        char.two = game.d6;
        rollDice6();
        char.three = game.d6;
        rollDice6();
        char.four = game.d6;
        console.log("Removing: "+Math.min(char.one, char.two, char.three, char.four));
        game.CON = char.one+char.two+char.three+char.four-Math.min(char.one, char.two, char.three, char.four);
        //Roll INT
        console.log("Rolling INT");
        rollDice6();
        char.one = game.d6;
        rollDice6();
        char.two = game.d6;
        rollDice6();
        char.three = game.d6;
        rollDice6();
        char.four = game.d6;
        console.log("Removing: "+Math.min(char.one, char.two, char.three, char.four));
        game.INT = char.one+char.two+char.three+char.four-Math.min(char.one, char.two, char.three, char.four);
        //Roll WIS
        console.log("Rolling WIS");
        rollDice6();
        char.one = game.d6;
        rollDice6();
        char.two = game.d6;
        rollDice6();
        char.three = game.d6;
        rollDice6();
        char.four = game.d6;
        console.log("Removing: "+Math.min(char.one, char.two, char.three, char.four));
        game.WIS = char.one+char.two+char.three+char.four-Math.min(char.one, char.two, char.three, char.four);
        //Roll CHA
        console.log("Rolling CHA");
        rollDice6();
        char.one = game.d6;
        rollDice6();
        char.two = game.d6;
        rollDice6();
        char.three = game.d6;
        rollDice6();
        char.four = game.d6;
        console.log("Removing: "+Math.min(char.one, char.two, char.three, char.four));
        game.CHA = char.one+char.two+char.three+char.four-Math.min(char.one, char.two, char.three, char.four);
        //roll HP
        rollDice8();
        game.HP = game.d8 + 10;
        updateScreen();
    } else {
        gameLoad();
        if (game.progress == 0) {
            document.getElementById("fightBattle").disabled = true;
            document.getElementById("encounterGen").disabled = true;
        } else if (game.progress == 1) {
            document.getElementById("gameMessage").disabled = true;
            document.getElementById("fightBattle").disabled = true;
            document.getElementById("encounterGen").disabled = false;
        } else if (game.progress == 2) {
            document.getElementById("gameMessage").disabled = true;
            document.getElementById("fightBattle").disabled = false;
            document.getElementById("encounterGen").disabled = true;
        }
        updateScreen();
        checkStatPoints();
    }
}

//main game
//prototype
//fumble checking
function gameMessage() {
    game.turn++
    game.totalTurns++
    document.getElementById("gameText").innerHTML = game.text1[0];
    document.getElementById("gameText2").innerHTML = game.text1[1];
    document.getElementById("gameText3").innerHTML = game.text1[2];
    rollDice20();
    if (game.d20 > 1) {
        document.getElementById("gameText4").innerHTML = game.text1[3];
        document.getElementById( "gameMessage" ).setAttribute( "disabled", "true" );
        document.getElementById("gameMessage").innerHTML = "Continue"
        document.getElementById("encounterGen").disabled = false;
        game.progress = 1;
    } else {
        document.getElementById("gameText4").innerHTML = game.text1[4];
        game.HP--
        hitPoints();
    }
}

//boss
function gameMessage3() {
    game.turn++
    game.totalTurns++
    document.getElementById("gameText").innerHTML = "Boss Battle";
    document.getElementById("gameText2").innerHTML = "no info";
    document.getElementById("gameTextEvil").innerHTML = game.text2[1];
    document.getElementById("gameTextEvil2").innerHTML = "No info.";
    //Evil
    rollEvilDice20();
    if (game.eD20 > 10) {
        console.log("Evil hit!");
        rollEvilDice4();
        game.HP = game.HP - game.eD4;
        document.getElementById("gameTextEvil3").innerHTML = game.battleText1[2];
        document.getElementById("gameTextEvil4").innerHTML = "Evil deals "+game.eD4+" damage to "+game.playerName;
        hitPoints();
    } else {
        document.getElementById("gameTextEvil3").innerHTML = game.battleText1[3];
        document.getElementById("gameTextEvil4").innerHTML = game.battleMiss[0];
    }
    //Player
    rollDice20();
    if (game.d20 > 11) {
        console.log("Hit!");
        rollDice4();
        game.EHP = game.EHP - game.d4;
        if (game.EHP < 1) {
            document.getElementById("gameText4").innerHTML = "You deal "+game.d4+" damage to evil! " + game.EHP + " HP left!";
            game.kills++;
            game.totalKills++;
            document.getElementById("gameText2").innerHTML = "evil dead";
            window.alert("You win!\nThanks for trying the prototype of my game!\n\nHere are the stats for your run!\n\nTotal turns: " + game.totalTurns + "\nTotal kills: " + game.totalKills + "\nTotal Deaths: " + game.deaths);
            //document.getElementById( "gameMessage" ).setAttribute( "onclick", "javascript: gameMessage3();" );
        } else {
            document.getElementById("gameText4").innerHTML = "You deal "+game.d4+" damage to evil! " + game.EHP + " HP left!";
        }
    } else {
        document.getElementById("gameText3").innerHTML = game.battleText1[1];
        document.getElementById("gameText4").innerHTML = game.battleMiss[0];
        console.log("Miss!");
    }
}

//prototype2
//trap
function gameMessage4() {
    game.turn++
    game.totalTurns++
    document.getElementById("gameText").innerHTML = game.trapText[0];
    document.getElementById("gameText2").innerHTML = "Stats are not in game yet, this will just be a d20";
    document.getElementById("gameText3").innerHTML = game.trapText[2];
    rollDice20();
    if (game.d20 > 14) { //2-4
        console.log("hdmg");
        //take heavy dmg
    } else if (game.d20 > 9) { //5-9
        console.log("mdmg");
        //take mod dmg
    } else if (game.d20 > 4) { //10-14
        console.log("ldmg");
        //take light dmg
    } else if (game.d20 > 1) {
        console.log("nodmg");
        //take no dmg
    } else {
        console.log("fumble");
        //fumble
    }
}
//random encounter
function encounterGen() {
    game.progress = 2;
    document.getElementById("gameText").innerHTML = "Normal Battle";
    document.getElementById("gameText2").innerHTML = "no info";
    //pick a random monster
    document.getElementById("gameTextEvil").innerHTML = game.text2[0];
    //document.getElementById("gameTextEvil").innerHTML = game.text2[Math.floor(Math.random() * game.text2.length)];
    console.log(document.getElementById("gameTextEvil"));
    document.getElementById("gameTextEvil2").innerHTML = "No info.";
    
    if (document.getElementById("gameTextEvil").innerHTML===("You encountered a Goblin!")) {
        game.EHP = Math.floor(Math.random() * 15) + 5;
        game.eLVL = Math.floor(Math.random() * 2) + 1;
        game.eAC = 5;
        game.mobEXP = game.EHP / game.LVL * game.eLVL;
        updateScreen();
        document.getElementById("encounterGen").disabled = true;
        document.getElementById("fightBattle").disabled = false;
    } else if (document.getElementById("gameTextEvil").innerHTML===("You encountered a Vampire!")) {
        game.EHP = Math.floor(Math.random() * 15) + 5;
        game.eLVL = Math.floor(Math.random() * 2) + 1;
        game.eAC = 5;
        game.mobEXP = game.EHP / game.LVL * game.eLVL;
        updateScreen();
        document.getElementById("encounterGen").disabled = true;
        document.getElementById("fightBattle").disabled = false;
    } else if (document.getElementById("gameTextEvil").innerHTML===("You encountered a Ghoul!")) {
        game.EHP = Math.floor(Math.random() * 15) + 5;
        game.eLVL = Math.floor(Math.random() * 2) + 1;
        game.eAC = 5;
        game.mobEXP = game.EHP / game.LVL * game.eLVL;
        updateScreen();
        document.getElementById("encounterGen").disabled = true;
        document.getElementById("fightBattle").disabled = false;
    } else if (document.getElementById("gameTextEvil").innerHTML===("You encountered a Cyclops!")) {
        game.EHP = Math.floor(Math.random() * 15) + 5;
        game.eLVL = Math.floor(Math.random() * 2) + 1;
        game.eAC = 5;
        game.mobEXP = game.EHP / game.LVL * game.eLVL;
        updateScreen();
        document.getElementById("encounterGen").disabled = true;
        document.getElementById("fightBattle").disabled = false;
    } else if (document.getElementById("gameTextEvil").innerHTML===("You encountered a Giant Rat!")) {
        game.EHP = Math.floor(Math.random() * 15) + 5;
        game.eLVL = Math.floor(Math.random() * 2) + 1;
        game.eAC = 5;
        game.mobEXP = game.EHP / game.LVL * game.eLVL;
        updateScreen();
        document.getElementById("encounterGen").disabled = true;
        document.getElementById("fightBattle").disabled = false;
    } else if (document.getElementById("gameTextEvil").innerHTML===("You encountered a Giant Arachnid!")) {
        game.EHP = Math.floor(Math.random() * 15) + 5;
        game.eLVL = Math.floor(Math.random() * 2) + 1;
        game.eAC = 5;
        game.mobEXP = game.EHP / game.LVL * game.eLVL;
        updateScreen();
        document.getElementById("encounterGen").disabled = true;
        document.getElementById("fightBattle").disabled = false;
    } else if (document.getElementById("gameTextEvil").innerHTML===("You encountered a Slime!")) {
        game.EHP = Math.floor(Math.random() * 15) + 5;
        game.eLVL = Math.floor(Math.random() * 2) + 1;
        game.eAC = 5;
        game.mobEXP = game.EHP / game.LVL * game.eLVL;
        updateScreen();
        document.getElementById("encounterGen").disabled = true;
        document.getElementById("fightBattle").disabled = false;
    } else if (document.getElementById("gameTextEvil").innerHTML===("You encountered a G-g-g-g-host!")) {
        game.EHP = Math.floor(Math.random() * 15) + 5;
        game.eLVL = Math.floor(Math.random() * 2) + 1;
        game.eAC = 5;
        game.mobEXP = game.EHP / game.LVL * game.eLVL;
        updateScreen();
        document.getElementById("encounterGen").disabled = true;
        document.getElementById("fightBattle").disabled = false;
    } else if (document.getElementById("gameTextEvil").innerHTML===("You encountered a Witch!")) {
        game.EHP = Math.floor(Math.random() * 15) + 5;
        game.eLVL = Math.floor(Math.random() * 2) + 1;
        game.eAC = 5;
        game.mobEXP = game.EHP / game.LVL * game.eLVL;
        updateScreen();
        document.getElementById("encounterGen").disabled = true;
        document.getElementById("fightBattle").disabled = false;
    } else if (document.getElementById("gameTextEvil").innerHTML===("You encountered a Glitch!")) {
        game.EHP = Math.floor(Math.random() * 15) + 5;
        game.eLVL = Math.floor(Math.random() * 2) + 1;
        game.eAC = 5;
        game.mobEXP = game.EHP / game.LVL * game.eLVL;
        updateScreen();
        document.getElementById("encounterGen").disabled = true;
        document.getElementById("fightBattle").disabled = false;
    } else {
        //MOB ID DOES NOT EXIST
        document.getElementById("gameTextEvil").innerHTML = game.text2[10];
        game.EHP = Math.floor(Math.random() * 15) + 5;
        game.eLVL = Math.floor(Math.random() * 2) + 1;
        game.eAC = 5;
        game.mobEXP = game.EHP / game.LVL * game.eLVL;
        updateScreen();
        document.getElementById("encounterGen").disabled = true;
        document.getElementById("fightBattle").disabled = false; 
    } 
}

function fightBattle() {
    game.turn++;
    game.totalTurns++;
    //Evil
    rollEvilDice20();
    if (game.eD20 > game.AC) {
        console.log("Evil hit!");
        if (game.eLVL === 1) {
            rollEvilDice4();
            game.HP = game.HP - game.eD4;
            document.getElementById("gameTextEvil3").innerHTML = game.battleText1[2];
            document.getElementById("gameTextEvil4").innerHTML = "Evil deals "+game.eD4+" damage to "+game.playerName;
            hitPoints();
            updateScreen();
        } else if (game.eLVL === 2) {
            rollEvilDice6();
            game.HP = game.HP - game.eD6;
            document.getElementById("gameTextEvil3").innerHTML = game.battleText1[2];
            document.getElementById("gameTextEvil4").innerHTML = "Evil deals "+game.eD6+" damage to "+game.playerName;
            hitPoints();
            updateScreen();
        } else {
            //do nothing
        }
        
    } else {
        document.getElementById("gameTextEvil3").innerHTML = game.battleText1[3];
        document.getElementById("gameTextEvil4").innerHTML = game.battleMiss[0];
        updateScreen();
    }
    //Player
    rollDice20();
    if (game.d20 > game.eAC) {
        console.log("Hit!");
        document.getElementById("gameText3").innerHTML = game.battleText1[0];
        rollDice4();
        game.EHP = game.EHP - game.d4;
        if (game.EHP < 1) {
            document.getElementById("gameText4").innerHTML = "You deal "+game.d4+" damage to evil! Evil is dead!";
            game.kills++;
            game.totalKills++;
            document.getElementById("encounterGen").disabled = false;
            document.getElementById("fightBattle").disabled = true;
            game.EXP = game.EXP + game.mobEXP;
            levelUp();
            updateScreen();
            game.progress = 1;
        } else {
            document.getElementById("gameText4").innerHTML = "You deal "+game.d4+" damage to evil! " + game.EHP + " HP left!";
            updateScreen();
        }
    } else {
        document.getElementById("gameText3").innerHTML = game.battleText1[1];
        document.getElementById("gameText4").innerHTML = game.battleMiss[0];
        console.log("Miss!");
        updateScreen();
    }
}

function levelUp(){
    //check exp is correct
    if (game.EXP >= game.maxEXP) {
        //grant level up
        game.LVL++
        //reset exp
        game.EXP = 0;
        //calc new max exp
        game.maxEXP = Math.floor(50 * Math.pow(1.2,game.LVL));
        //stat up
        //hp
        rollDice8();
        game.HP = game.HP+game.d8;
        //stat points
        game.statPoints++
        checkStatPoints();
        
    }
}

function checkStatPoints() {
    if (game.statPoints > 0) {
        document.getElementById("lvlSTR").style.display="inline";
        document.getElementById("lvlDEX").style.display="inline";
        document.getElementById("lvlCON").style.display="inline";
        document.getElementById("lvlINT").style.display="inline";
        document.getElementById("lvlWIS").style.display="inline";
        document.getElementById("lvlCHA").style.display="inline";
    } else {
        document.getElementById("lvlSTR").style.display="none";
        document.getElementById("lvlDEX").style.display="none";
        document.getElementById("lvlCON").style.display="none";
        document.getElementById("lvlINT").style.display="none";
        document.getElementById("lvlWIS").style.display="none";
        document.getElementById("lvlCHA").style.display="none";
    }
}



function lvlSTR() {
    if (game.statPoints < 1) {
        game.statPoints--
        gameOver();
    } else {
    game.statPoints--
    game.STR++
    updateScreen();
    checkStatPoints(); 
    }
}
function lvlDEX() {
    if (game.statPoints < 1) {
        game.statPoints--
        gameOver();
    } else {
    game.statPoints--
    game.DEX++
    updateScreen();
    checkStatPoints(); 
    }
}
function lvlCON() {
    if (game.statPoints < 1) {
        game.statPoints--
        gameOver();
    } else {
    game.statPoints--
    game.CON++
    updateScreen();
    checkStatPoints(); 
    }
}
function lvlINT() {
    if (game.statPoints < 1) {
        game.statPoints--
        gameOver();
    } else {
    game.statPoints--
    game.INT++
    updateScreen();
    checkStatPoints(); 
    }
}
function lvlWIS() {
    if (game.statPoints < 1) {
        game.statPoints--
        gameOver();
    } else {
    game.statPoints--
    game.WIS++
    updateScreen();
    checkStatPoints(); 
    }
}
function lvlCHA() {
    if (game.statPoints < 1) {
        game.statPoints--
        gameOver();
    } else {
    game.statPoints--
    game.CHA++
    updateScreen();
    checkStatPoints(); 
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
    if (game.statPoints == -1) {
        window.alert("Cheating detected\nGame Over!");
    } else {
        window.alert("Game Over!\nYou lasted " + game.turn + " turns!\n\n You gained 1 bonus HP!");
        game.HP = 12 + game.bonusHP;
    }
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
    game.deaths++
    game.EHP = 0;
    game.progress = 1;
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
    document.getElementById("playerName").innerHTML = game.playerName;
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
//Evil dice
function rollEvilDice4() {
    console.log("rolling ed4");
    game.eD4 = Math.floor(Math.random() * 4) + 1;
    console.log("evil rolled: " + game.eD4)
    updateScreen()
}
function rollEvilDice6() {
    console.log("rolling ed6");
    game.eD6 = Math.floor(Math.random() * 6) + 1;
    console.log("evil rolled: " + game.eD6)
    updateScreen()
}
function rollEvilDice8() {
    console.log("rolling ed8");
    game.eD8 = Math.floor(Math.random() * 8) + 1;
    console.log("evil rolled: " + game.eD8)
    updateScreen()
}
function rollEvilDice10() {
    console.log("rolling ed10");
    game.eD10 = Math.floor(Math.random() * 10) + 1;
    console.log("evil rolled: " + game.eD10)
    updateScreen()
}
function rollEvilDice12() {
    console.log("rolling ed12");
    game.eD12 = Math.floor(Math.random() * 12) + 1;
    console.log("evil rolled: " + game.eD12)
    updateScreen()
}
function rollEvilDice20() {
    console.log("rolling ed20");
    game.eD20 = Math.floor(Math.random() * 20) + 1;
    console.log("evil rolled: " + game.eD20)
    updateScreen()
}
function rollEvilDice100() {
    console.log("rolling ed100");
    game.eD100 = Math.floor(Math.random() * 100) + 1;
    console.log("evil rolled: " + game.eD100)
    updateScreen()
}

//screen update
function updateScreen() {
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
    document.getElementById("STR").innerHTML = game.STR;
    document.getElementById("DEX").innerHTML = game.DEX;
    document.getElementById("CON").innerHTML = game.CON;
    document.getElementById("INT").innerHTML = game.INT;
    document.getElementById("WIS").innerHTML = game.WIS;
    document.getElementById("CHA").innerHTML = game.CHA;
    document.getElementById("EXP").innerHTML = game.EXP;
    document.getElementById("maxEXP").innerHTML = game.maxEXP;
    document.getElementById("LVL").innerHTML = game.LVL;
    document.getElementById("statPoints").innerHTML = game.statPoints;
    document.getElementById("eLVL").innerHTML = game.eLVL;
}

//Game ticker
window.setInterval(function(){
    updateScreen(),checkStatPoints(),gameSave(),console.log("tick...")
},10000);