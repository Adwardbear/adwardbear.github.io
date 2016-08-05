var myTimer;
var myTimer2;
var myTimer3;
var myTimer4;
var myTimer5;
var myTimer6;
var myTimer7;
var machine = {
    reelOne: 0,
    reelTwo: 0,
    reelThree: 0,
    reelOneHold: false,
    reelTwoHold: false,
    reelThreeHold: false,
    symbolOne: "One",
    scoreOne: 10,
    scoreTwo: 20,
    scoreThree: 40,
    scoreFour: 80,
    scoreFive: 160,
    scoreSix: 320,
    symbolTwo: "Two",
    symbolThree: "Three",
    symbolFour: "Four",
    symbolFive: "Five",
    symbolSix: "Six",
    score: 0,
    credit: 1000,
    turn: 0,
    hold: 0,
    holdCheat: 0,
    holdDisable: 0,
    nudge: 0,
    autoSpin: false,
}
function updateScreen(){
    document.getElementById("credit").innerHTML = machine.credit;
    document.getElementById("hold").innerHTML = machine.hold;
    checkHold();
}
//insert credit
function insertCredit(){
    machine.credit = machine.credit + 1000;
    document.getElementById("credit").innerHTML = machine.credit;
}
//auto spin
function autoSpin(){
    machine.autoSpin = true;
    document.getElementById("spinBtn").disabled = true;
    document.getElementById("text1").innerHTML = "Auto spinning!";
    document.getElementById("auto").innerHTML = "Stop Auto Spin!";
    document.getElementById("auto").setAttribute("onclick", "stopAutoSpin()");
    console.log("Auto Spinning!");
    spin();
    myTimer = window.setInterval(function(){
        if(machine.holdCheat > 1){
        spin();
        console.log("tick...");
        } else {
            spinHoldReset();
        }
    },5000);
}
//stop auto spin
function stopAutoSpin(){
    document.getElementById("spinBtn").disabled = false;
    document.getElementById("text1").innerHTML = "No longer auto spinning due to: User stopped!"
    window.clearInterval(myTimer);
    console.log("No longer auto spinning!");
    document.getElementById("auto").innerHTML = "Auto Spin!"
    document.getElementById("auto").setAttribute("onclick", "autoSpin()");
}

function spin(){
    if(machine.credit >9){
        machine.credit = machine.credit - 10;
    document.getElementById("spinBtn").disabled = true;
    document.getElementById("auto").disabled = true;
    machine.holdCheat = 0;
    machine.hold = 0;
    updateScreen();
    if(machine.reelOneHold == false){
    myTimer3 = window.setInterval(function(){
        rollReelOne();
        updateReelOneDummy();
    },20);
    setTimeout(function(){
        window.clearInterval(myTimer3);
        updateReelOne();
    }, 2000);}
    if(machine.reelTwoHold == false){
    myTimer4 = window.setInterval(function(){
        rollReelTwo();
        updateReelTwoDummy();
    },20);
    setTimeout(function(){
        window.clearInterval(myTimer4);
        updateReelTwo();
    }, 3000);}
    if(machine.reelThreeHold == false){
    myTimer5 = window.setInterval(function(){
        rollReelThree();
        updateReelThreeDummy();
    },20);
    setTimeout(function(){
        window.clearInterval(myTimer5);
        updateReelThree();
    }, 4000);}
    if(machine.holdDisable > 1){
        if(machine.autoSpin == true){
            document.getElementById("spinBtn").disabled = true;
        }
        document.getElementById("spinBtn").setAttribute("onclick", "spinHoldReset()");
        console.log("hold disable detected!");
    }
    } else {
        document.getElementById("text1").innerHTML = "No credit!";
    }
}

function spinHoldReset(){
    if(machine.autoSpin == true){
            document.getElementById("spinBtn").disabled = true;
        }
    machine.holdDisable = 0;
    machine.hold = 0;
    console.log("resetting hold disable "+machine.holdDisable);
    document.getElementById("spinBtn").setAttribute("onclick", "spin()");
    spin();
}
//spins reel1
function rollReelOne(){
    if(machine.reelOneHold == false){
        //roll 0-5
        machine.reelOne = Math.floor(Math.random() * 6);
    } else {
        //do nothing
    }
}
//holds reel1
function holdReelOne(){
    if(machine.reelOneHold == false){
        machine.reelOneHold = true;
        console.log("Reel One is in Hold")
        machine.hold = machine.hold - 1;
        machine.holdCheat++
        machine.holdDisable++
        checkHoldDisable();
        document.getElementById("held1").innerHTML = "HELD"
        document.getElementById("holdOne").disabled = true;
    } else {
        machine.reelOneHold = false;
        console.log("Reel One is no longer in Hold")
    }
}
//spins reel2
function rollReelTwo(){
    if(machine.reelTwoHold == false){
        //roll 0-5
        machine.reelTwo = Math.floor(Math.random() * 6);
    } else {
        //do nothing
    }
}
//holds reel2
function holdReelTwo(){
    if(machine.reelTwoHold == false){
        machine.reelTwoHold = true;
        console.log("Reel Two is in Hold")
        machine.hold = machine.hold - 1;
        machine.holdCheat++
        machine.holdDisable++
        checkHoldDisable();
        document.getElementById("held2").innerHTML = "HELD"
        document.getElementById("holdTwo").disabled = true;
    } else {
        machine.reelTwoHold = false;
        console.log("Reel Two is no longer in Hold")
    }
}
//spins reel3
function rollReelThree(){
    if(machine.reelThreeHold == false){
        //roll 0-5
        machine.reelThree = Math.floor(Math.random() * 6);
    } else {
        //do nothing
    }
}
//holds reel3
function holdReelThree(){
    if(machine.reelThreeHold == false){
        machine.reelThreeHold = true;
        console.log("Reel Three is in Hold")
        machine.hold = machine.hold - 1;
        machine.holdCheat++
        machine.holdDisable++
        checkHoldDisable();
        document.getElementById("held3").innerHTML = "HELD"
        document.getElementById("holdThree").disabled = true;
    } else {
        machine.reelThreeHold = false;
        console.log("Reel Three is no longer in Hold")
    }
}
//update reel1
function updateReelOne(){
    if(machine.reelOne === 0){
        document.getElementById("reelOneUp").innerHTML = machine.symbolSix;
        document.getElementById("reelOne").innerHTML = machine.symbolOne;
        document.getElementById("reelOneDown").innerHTML = machine.symbolTwo;
    } else if(machine.reelOne === 1){
        document.getElementById("reelOneUp").innerHTML = machine.symbolOne;
        document.getElementById("reelOne").innerHTML = machine.symbolTwo;
        document.getElementById("reelOneDown").innerHTML = machine.symbolThree;
    } else if(machine.reelOne === 2){
        document.getElementById("reelOneUp").innerHTML = machine.symbolTwo;
        document.getElementById("reelOne").innerHTML = machine.symbolThree;
        document.getElementById("reelOneDown").innerHTML = machine.symbolFour;
    } else if(machine.reelOne === 3){
        document.getElementById("reelOneUp").innerHTML = machine.symbolThree;
        document.getElementById("reelOne").innerHTML = machine.symbolFour;
        document.getElementById("reelOneDown").innerHTML = machine.symbolFive;
    } else if(machine.reelOne === 4){
        document.getElementById("reelOneUp").innerHTML = machine.symbolFour;
        document.getElementById("reelOne").innerHTML = machine.symbolFive;
        document.getElementById("reelOneDown").innerHTML = machine.symbolSix;
    } else if(machine.reelOne === 5){
        document.getElementById("reelOneUp").innerHTML = machine.symbolFive;
        document.getElementById("reelOne").innerHTML = machine.symbolSix;
        document.getElementById("reelOneDown").innerHTML = machine.symbolOne;
    }
    if(machine.reelTwoHold == true){
        if(machine.reelThreeHold == true){
            console.log("Updating from reel1");
            doubleOne();
            doubleTwo();
            doubleThree();
            doubleFour();
            doubleFive();
            doubleSix();
            tripleOne();
            tripleTwo();
            tripleThree();
            tripleFour();
            tripleFive();
            tripleSix();
        holdCheatCheck();
        checkHoldDisable();
        document.getElementById("held1").innerHTML = "-"
        document.getElementById("held2").innerHTML = "-"
        document.getElementById("held3").innerHTML = "-"
        document.getElementById("nudge").innerHTML = machine.nudge;
        document.getElementById("hold").innerHTML = machine.hold;
        machine.reelOneHold = false;
        machine.reelTwoHold = false;
        machine.reelThreeHold = false;
            checkHold();
            document.getElementById("spinBtn").disabled = false;
            document.getElementById("auto").disabled = false;
        }
    }
}
//update reel2
function updateReelTwo(){
    if(machine.reelTwo === 0){
        document.getElementById("reelTwoUp").innerHTML = machine.symbolSix;
        document.getElementById("reelTwo").innerHTML = machine.symbolOne;
        document.getElementById("reelTwoDown").innerHTML = machine.symbolTwo;
    } else if(machine.reelTwo === 1){
        document.getElementById("reelTwoUp").innerHTML = machine.symbolOne;
        document.getElementById("reelTwo").innerHTML = machine.symbolTwo;
        document.getElementById("reelTwoDown").innerHTML = machine.symbolThree;
    } else if(machine.reelTwo === 2){
        document.getElementById("reelTwoUp").innerHTML = machine.symbolTwo;
        document.getElementById("reelTwo").innerHTML = machine.symbolThree;
        document.getElementById("reelTwoDown").innerHTML = machine.symbolFour;
    } else if(machine.reelTwo === 3){
        document.getElementById("reelTwoUp").innerHTML = machine.symbolThree;
        document.getElementById("reelTwo").innerHTML = machine.symbolFour;
        document.getElementById("reelTwoDown").innerHTML = machine.symbolFive;
    } else if(machine.reelTwo === 4){
        document.getElementById("reelTwoUp").innerHTML = machine.symbolFour;
        document.getElementById("reelTwo").innerHTML = machine.symbolFive;
        document.getElementById("reelTwoDown").innerHTML = machine.symbolSix;
    } else if(machine.reelTwo === 5){
        document.getElementById("reelTwoUp").innerHTML = machine.symbolFive;
        document.getElementById("reelTwo").innerHTML = machine.symbolSix;
        document.getElementById("reelTwoDown").innerHTML = machine.symbolOne;
    }
    if(machine.reelOneHold == true){
        if(machine.reelThreeHold == true){
            console.log("Updating from reel2");
            doubleOne();
            doubleTwo();
            doubleThree();
            doubleFour();
            doubleFive();
            doubleSix();
            tripleOne();
            tripleTwo();
            tripleThree();
            tripleFour();
            tripleFive();
            tripleSix();
        holdCheatCheck();
        checkHoldDisable();
        document.getElementById("held1").innerHTML = "-"
        document.getElementById("held2").innerHTML = "-"
        document.getElementById("held3").innerHTML = "-"
        document.getElementById("nudge").innerHTML = machine.nudge;
        document.getElementById("hold").innerHTML = machine.hold;
        machine.reelOneHold = false;
        machine.reelTwoHold = false;
        machine.reelThreeHold = false;
            checkHold();
            document.getElementById("spinBtn").disabled = false;
            document.getElementById("auto").disabled = false;
        }
    }
}
//update reel3
function updateReelThree(){
    if(machine.reelThree === 0){
        document.getElementById("reelThreeUp").innerHTML = machine.symbolSix;
        document.getElementById("reelThree").innerHTML = machine.symbolOne;
        document.getElementById("reelThreeDown").innerHTML = machine.symbolTwo;
    } else if(machine.reelThree === 1){
        document.getElementById("reelThreeUp").innerHTML = machine.symbolOne;
        document.getElementById("reelThree").innerHTML = machine.symbolTwo;
        document.getElementById("reelThreeDown").innerHTML = machine.symbolThree;
    } else if(machine.reelThree === 2){
        document.getElementById("reelThreeUp").innerHTML = machine.symbolTwo;
        document.getElementById("reelThree").innerHTML = machine.symbolThree;
        document.getElementById("reelThreeDown").innerHTML = machine.symbolFour;
    } else if(machine.reelThree === 3){
        document.getElementById("reelThreeUp").innerHTML = machine.symbolThree;
        document.getElementById("reelThree").innerHTML = machine.symbolFour;
        document.getElementById("reelThreeDown").innerHTML = machine.symbolFive;
    } else if(machine.reelThree === 4){
        document.getElementById("reelThreeUp").innerHTML = machine.symbolFour;
        document.getElementById("reelThree").innerHTML = machine.symbolFive;
        document.getElementById("reelThreeDown").innerHTML = machine.symbolSix;
    } else if(machine.reelThree === 5){
        document.getElementById("reelThreeUp").innerHTML = machine.symbolFive;
        document.getElementById("reelThree").innerHTML = machine.symbolSix;
        document.getElementById("reelThreeDown").innerHTML = machine.symbolOne;
    }
    if(machine.reelThreeHold == true){
        //DO NOTHING!
    } else {
        console.log("Updating from reel3");
        doubleOne();
        doubleTwo();
        doubleThree();
        doubleFour();
        doubleFive();
        doubleSix();
        tripleOne();
        tripleTwo();
        tripleThree();
        tripleFour();
        tripleFive();
        tripleSix();
        holdCheatCheck();
        checkHoldDisable();
        document.getElementById("held1").innerHTML = "-"
        document.getElementById("held2").innerHTML = "-"
        document.getElementById("held3").innerHTML = "-"
        document.getElementById("nudge").innerHTML = machine.nudge;
        document.getElementById("hold").innerHTML = machine.hold;
        machine.reelOneHold = false;
        machine.reelTwoHold = false;
        machine.reelThreeHold = false;
        checkHold();
        document.getElementById("spinBtn").disabled = false;
        document.getElementById("auto").disabled = false;
    }
}
//DUMMY REELS
function updateReelOneDummy(){
    if(machine.reelOne === 0){
        document.getElementById("reelOneUp").innerHTML = machine.symbolSix;
        document.getElementById("reelOne").innerHTML = machine.symbolOne;
        document.getElementById("reelOneDown").innerHTML = machine.symbolTwo;
    } else if(machine.reelOne === 1){
        document.getElementById("reelOneUp").innerHTML = machine.symbolOne;
        document.getElementById("reelOne").innerHTML = machine.symbolTwo;
        document.getElementById("reelOneDown").innerHTML = machine.symbolThree;
    } else if(machine.reelOne === 2){
        document.getElementById("reelOneUp").innerHTML = machine.symbolTwo;
        document.getElementById("reelOne").innerHTML = machine.symbolThree;
        document.getElementById("reelOneDown").innerHTML = machine.symbolFour;
    } else if(machine.reelOne === 3){
        document.getElementById("reelOneUp").innerHTML = machine.symbolThree;
        document.getElementById("reelOne").innerHTML = machine.symbolFour;
        document.getElementById("reelOneDown").innerHTML = machine.symbolFive;
    } else if(machine.reelOne === 4){
        document.getElementById("reelOneUp").innerHTML = machine.symbolFour;
        document.getElementById("reelOne").innerHTML = machine.symbolFive;
        document.getElementById("reelOneDown").innerHTML = machine.symbolSix;
    } else if(machine.reelOne === 5){
        document.getElementById("reelOneUp").innerHTML = machine.symbolFive;
        document.getElementById("reelOne").innerHTML = machine.symbolSix;
        document.getElementById("reelOneDown").innerHTML = machine.symbolOne;
    }
}
//update reel2
function updateReelTwoDummy(){
    if(machine.reelTwo === 0){
        document.getElementById("reelTwoUp").innerHTML = machine.symbolSix;
        document.getElementById("reelTwo").innerHTML = machine.symbolOne;
        document.getElementById("reelTwoDown").innerHTML = machine.symbolTwo;
    } else if(machine.reelTwo === 1){
        document.getElementById("reelTwoUp").innerHTML = machine.symbolOne;
        document.getElementById("reelTwo").innerHTML = machine.symbolTwo;
        document.getElementById("reelTwoDown").innerHTML = machine.symbolThree;
    } else if(machine.reelTwo === 2){
        document.getElementById("reelTwoUp").innerHTML = machine.symbolTwo;
        document.getElementById("reelTwo").innerHTML = machine.symbolThree;
        document.getElementById("reelTwoDown").innerHTML = machine.symbolFour;
    } else if(machine.reelTwo === 3){
        document.getElementById("reelTwoUp").innerHTML = machine.symbolThree;
        document.getElementById("reelTwo").innerHTML = machine.symbolFour;
        document.getElementById("reelTwoDown").innerHTML = machine.symbolFive;
    } else if(machine.reelTwo === 4){
        document.getElementById("reelTwoUp").innerHTML = machine.symbolFour;
        document.getElementById("reelTwo").innerHTML = machine.symbolFive;
        document.getElementById("reelTwoDown").innerHTML = machine.symbolSix;
    } else if(machine.reelTwo === 5){
        document.getElementById("reelTwoUp").innerHTML = machine.symbolFive;
        document.getElementById("reelTwo").innerHTML = machine.symbolSix;
        document.getElementById("reelTwoDown").innerHTML = machine.symbolOne;
    }
}
//update reel3
function updateReelThreeDummy(){
    if(machine.reelThree === 0){
        document.getElementById("reelThreeUp").innerHTML = machine.symbolSix;
        document.getElementById("reelThree").innerHTML = machine.symbolOne;
        document.getElementById("reelThreeDown").innerHTML = machine.symbolTwo;
    } else if(machine.reelThree === 1){
        document.getElementById("reelThreeUp").innerHTML = machine.symbolOne;
        document.getElementById("reelThree").innerHTML = machine.symbolTwo;
        document.getElementById("reelThreeDown").innerHTML = machine.symbolThree;
    } else if(machine.reelThree === 2){
        document.getElementById("reelThreeUp").innerHTML = machine.symbolTwo;
        document.getElementById("reelThree").innerHTML = machine.symbolThree;
        document.getElementById("reelThreeDown").innerHTML = machine.symbolFour;
    } else if(machine.reelThree === 3){
        document.getElementById("reelThreeUp").innerHTML = machine.symbolThree;
        document.getElementById("reelThree").innerHTML = machine.symbolFour;
        document.getElementById("reelThreeDown").innerHTML = machine.symbolFive;
    } else if(machine.reelThree === 4){
        document.getElementById("reelThreeUp").innerHTML = machine.symbolFour;
        document.getElementById("reelThree").innerHTML = machine.symbolFive;
        document.getElementById("reelThreeDown").innerHTML = machine.symbolSix;
    } else if(machine.reelThree === 5){
        document.getElementById("reelThreeUp").innerHTML = machine.symbolFive;
        document.getElementById("reelThree").innerHTML = machine.symbolSix;
        document.getElementById("reelThreeDown").innerHTML = machine.symbolOne;
    }
}
//scoring
//x2 One
function doubleOne(){
    if(document.getElementById("reelOne").innerHTML===("One")){
        if(document.getElementById("reelTwo").innerHTML===("One")){
            machine.hold = machine.hold + 2;
        } else if(document.getElementById("reelThree").innerHTML===("One")){
            machine.hold = machine.hold + 2;
        }
    } else if(document.getElementById("reelTwo").innerHTML===("One")){
        if(document.getElementById("reelThree").innerHTML===("One")){
            machine.hold = machine.hold + 2;
        }
    }
}
//x2 Two
function doubleTwo(){
    if(document.getElementById("reelOne").innerHTML===("Two")){
        if(document.getElementById("reelTwo").innerHTML===("Two")){
            machine.hold = machine.hold + 2;
        } else if(document.getElementById("reelThree").innerHTML===("Two")){
            machine.hold = machine.hold + 2;
        }
    } else if(document.getElementById("reelTwo").innerHTML===("Two")){
        if(document.getElementById("reelThree").innerHTML===("Two")){
            machine.hold = machine.hold + 2;
        }
    }
}
//x2 Three
function doubleThree(){
    if(document.getElementById("reelOne").innerHTML===("Three")){
        if(document.getElementById("reelTwo").innerHTML===("Three")){
            machine.hold = machine.hold + 2;
        } else if(document.getElementById("reelThree").innerHTML===("Three")){
            machine.hold = machine.hold + 2;
        }
    } else if(document.getElementById("reelTwo").innerHTML===("Three")){
        if(document.getElementById("reelThree").innerHTML===("Three")){
            machine.hold = machine.hold + 2;
        }
    }
}
//x2 Four
function doubleFour(){
    if(document.getElementById("reelOne").innerHTML===("Four")){
        if(document.getElementById("reelTwo").innerHTML===("Four")){
            machine.hold = machine.hold + 2;
        } else if(document.getElementById("reelThree").innerHTML===("Four")){
            machine.hold = machine.hold + 2;
        }
    } else if(document.getElementById("reelTwo").innerHTML===("Four")){
        if(document.getElementById("reelThree").innerHTML===("Four")){
            machine.hold = machine.hold + 2;
        }
    }
}
//x2 Five
function doubleFive(){
    if(document.getElementById("reelOne").innerHTML===("Five")){
        if(document.getElementById("reelTwo").innerHTML===("Five")){
            machine.hold = machine.hold + 2;
        } else if(document.getElementById("reelThree").innerHTML===("Five")){
            machine.hold = machine.hold + 2;
        }
    } else if(document.getElementById("reelTwo").innerHTML===("Five")){
        if(document.getElementById("reelThree").innerHTML===("Five")){
            machine.hold = machine.hold + 2;
        }
    }
}
//x2 Six
function doubleSix(){
    if(document.getElementById("reelOne").innerHTML===("Six")){
        if(document.getElementById("reelTwo").innerHTML===("Six")){
            machine.hold = machine.hold + 2;
        } else if(document.getElementById("reelThree").innerHTML===("Six")){
            machine.hold = machine.hold + 2;
        }
    } else if(document.getElementById("reelTwo").innerHTML===("Six")){
        if(document.getElementById("reelThree").innerHTML===("Six")){
            machine.hold = machine.hold + 2;
        }
    }
}
//x3 One
function tripleOne(){
    if(document.getElementById("reelOne").innerHTML===("One")){
        if(document.getElementById("reelTwo").innerHTML===("One")){
            if(document.getElementById("reelThree").innerHTML===("One")){
                machine.score = machine.score + machine.scoreOne;
                document.getElementById("text1").innerHTML = ("You scored: "+machine.scoreOne)
                document.getElementById("score").innerHTML = machine.score;
                machine.hold = 0;
            }
        }
    }
}
//x3 Two
function tripleTwo(){
    if(document.getElementById("reelOne").innerHTML===("Two")){
        if(document.getElementById("reelTwo").innerHTML===("Two")){
            if(document.getElementById("reelThree").innerHTML===("Two")){
                machine.score = machine.score + machine.scoreTwo;
                document.getElementById("text1").innerHTML = ("You scored: "+machine.scoreTwo)
                document.getElementById("score").innerHTML = machine.score;
                machine.hold = 0;
            }
        }
    }
}
//x3 Three
function tripleThree(){
    if(document.getElementById("reelOne").innerHTML===("Three")){
        if(document.getElementById("reelTwo").innerHTML===("Three")){
            if(document.getElementById("reelThree").innerHTML===("Three")){
                machine.score = machine.score + machine.scoreThree;
                document.getElementById("text1").innerHTML = ("You scored: "+machine.scoreThree)
                document.getElementById("score").innerHTML = machine.score;
                machine.hold = 0;
            }
        }
    }
}
//x3 Four
function tripleFour(){
    if(document.getElementById("reelOne").innerHTML===("Four")){
        if(document.getElementById("reelTwo").innerHTML===("Four")){
            if(document.getElementById("reelThree").innerHTML===("Four")){
                machine.score = machine.score + machine.scoreFour;
                document.getElementById("text1").innerHTML = ("You scored: "+machine.scoreFour)
                document.getElementById("score").innerHTML = machine.score;
                machine.hold = 0;
            }
        }
    }
}
//x3 Five
function tripleFive(){
    if(document.getElementById("reelOne").innerHTML===("Five")){
        if(document.getElementById("reelTwo").innerHTML===("Five")){
            if(document.getElementById("reelThree").innerHTML===("Five")){
                machine.score = machine.score + machine.scoreFive;
                document.getElementById("text1").innerHTML = ("You scored: "+machine.scoreFive)
                document.getElementById("score").innerHTML = machine.score;
                machine.hold = 0;
            }
        }
    }
}
//x3 Six
function tripleSix(){
    if(document.getElementById("reelOne").innerHTML===("Six")){
        if(document.getElementById("reelTwo").innerHTML===("Six")){
            if(document.getElementById("reelThree").innerHTML===("Six")){
                machine.score = machine.score + machine.scoreSix;
                document.getElementById("text1").innerHTML = ("You scored: "+machine.scoreSix)
                document.getElementById("score").innerHTML = machine.score;
                machine.hold = 0;
            }
        }
    }
}
//nudge
/*function gameTurn(){
    if(machine.turn == 10){
        machine.hold++;
    } else if(machine.turn == 20){
        machine.hold++;
    } else if(machine.turn == 30){
        machine.hold++;
        machine.nudge++;
        machine.turn = 0;
    }
    document.getElementById("nudge").innerHTML = machine.nudge;
    document.getElementById("hold").innerHTML = machine.hold;
    checkHold();
}*/
//
function checkHold(){
    if(machine.hold > 1){
        window.clearInterval(myTimer);
        console.log("Found Holds - auto spinning stopped if active!");
        machine.autoSpin = false;
        document.getElementById("spinBtn").disabled = false;
        document.getElementById("text1").innerHTML = "Auto spinning disabled due to: Hold able!"
        document.getElementById("auto").innerHTML = "Auto Spin!"
        document.getElementById("auto").setAttribute("onclick", "autoSpin()");
        document.getElementById("holdOne").disabled = false;
        document.getElementById("holdTwo").disabled = false;
        document.getElementById("holdThree").disabled = false;
    } else {
        document.getElementById("holdOne").disabled = true;
        document.getElementById("holdTwo").disabled = true;
        document.getElementById("holdThree").disabled = true;
    }
    document.getElementById("hold").innerHTML = machine.hold;
    holdCheatCheck();
}
function checkHoldDisable(){
    if(machine.holdDisable > 1){
        machine.hold = 0;
        checkHold();
    } else {
        //do nothing
    }
    document.getElementById("hold").innerHTML = machine.hold;
}

function holdCheatCheck(){
    if(machine.holdCheat == 2){
        document.getElementById("holdOne").disabled = true;
        document.getElementById("holdTwo").disabled = true;
        document.getElementById("holdThree").disabled = true;
    }
}