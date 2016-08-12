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
    symbolOne: "Nudge 1",
    scoreOne: 10,
    scoreTwo: 20,
    scoreThree: 40,
    scoreFour: 80,
    scoreFive: 160,
    scoreSix: 320,
    scoreFourCount: 0,
    symbolTwo: "Heart 2",
    symbolThree: ":) 3",
    symbolFour: "BAR",
    symbolFive: "(-(-_(-_-)_-)-) 5",
    symbolSix: "Arrow 6",
    symbolSeven: "Nudge",
    score: 0,
    scoreHold: 0,
    credit: 1000,
    turn: 0,
    hold: 0,
    holdCheat: 0,
    holdDisable: 0,
    nudge: 0,
    autoSpin: false,
}

var imgBar = '<img src="Slot_Bar.png" title="" alt="" style="width:80;height:30;" />';

function symbolFourScore(){
    if(machine.scoreFourCount == 2){
        machine.hold = machine.hold + 2;
        machine.scoreHold = machine.scoreHold + 1;
    } else if(machine.scoreFourCount == 3){
        console.log("add points todo");
    }
}

function checkScoreHold(){
    if(machine.scoreHold < 2){
        machine.scoreHold = 0;
        console.log("scorehold = 1, restting to 0")
    } else
    if(machine.scoreHold > 3){
        machine.scoreHold = 0;
        machine.scoreFourCount = 0;
        console.log("scorehold greater than 3, resetting")
    }
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
        //machine.holdDisable = 0;
    machine.hold = 0;
        checkScoreHold();
        machine.scoreHold = machine.scoreHold + 1;
        console.log(machine.scoreHold+"scorehold");
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
        document.getElementById("reelOneDown").innerHTML = imgBar;
    } else if(machine.reelOne === 3){
        document.getElementById("reelOneUp").innerHTML = machine.symbolThree;
        document.getElementById("reelOne").innerHTML = imgBar;
        machine.scoreFourCount = machine.scoreFourCount + 1;
        document.getElementById("reelOneDown").innerHTML = machine.symbolFive;
    } else if(machine.reelOne === 4){
        document.getElementById("reelOneUp").innerHTML = imgBar;
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
            symbolFourScore();
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
        document.getElementById("reelTwoDown").innerHTML = imgBar;
    } else if(machine.reelTwo === 3){
        document.getElementById("reelTwoUp").innerHTML = machine.symbolThree;
        document.getElementById("reelTwo").innerHTML = imgBar;
        machine.scoreFourCount = machine.scoreFourCount + 1;
        document.getElementById("reelTwoDown").innerHTML = machine.symbolFive;
    } else if(machine.reelTwo === 4){
        document.getElementById("reelTwoUp").innerHTML = imgBar;
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
            symbolFourScore();
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
    } else if(machine.reelThreeHold == true){
            console.log("testtest");
            updateReelThree();
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
        document.getElementById("reelThreeDown").innerHTML = imgBar;
    } else if(machine.reelThree === 3){
        document.getElementById("reelThreeUp").innerHTML = machine.symbolThree;
        document.getElementById("reelThree").innerHTML = imgBar;
        machine.scoreFourCount = machine.scoreFourCount + 1;
        document.getElementById("reelThreeDown").innerHTML = machine.symbolFive;
    } else if(machine.reelThree === 4){
        document.getElementById("reelThreeUp").innerHTML = imgBar;
        document.getElementById("reelThree").innerHTML = machine.symbolFive;
        document.getElementById("reelThreeDown").innerHTML = machine.symbolSix;
    } else if(machine.reelThree === 5){
        document.getElementById("reelThreeUp").innerHTML = machine.symbolFive;
        document.getElementById("reelThree").innerHTML = machine.symbolSix;
        document.getElementById("reelThreeDown").innerHTML = machine.symbolOne;
    }
    
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
    symbolFourScore();
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
        document.getElementById("reelOneDown").innerHTML = imgBar;
    } else if(machine.reelOne === 3){
        document.getElementById("reelOneUp").innerHTML = machine.symbolThree;
        document.getElementById("reelOne").innerHTML = imgBar;
        document.getElementById("reelOneDown").innerHTML = machine.symbolFive;
    } else if(machine.reelOne === 4){
        document.getElementById("reelOneUp").innerHTML = imgBar;
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
        document.getElementById("reelTwoDown").innerHTML = imgBar;
    } else if(machine.reelTwo === 3){
        document.getElementById("reelTwoUp").innerHTML = machine.symbolThree;
        document.getElementById("reelTwo").innerHTML = imgBar;
        document.getElementById("reelTwoDown").innerHTML = machine.symbolFive;
    } else if(machine.reelTwo === 4){
        document.getElementById("reelTwoUp").innerHTML = imgBar;
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
        document.getElementById("reelThreeDown").innerHTML = imgBar;
    } else if(machine.reelThree === 3){
        document.getElementById("reelThreeUp").innerHTML = machine.symbolThree;
        document.getElementById("reelThree").innerHTML = imgBar;
        document.getElementById("reelThreeDown").innerHTML = machine.symbolFive;
    } else if(machine.reelThree === 4){
        document.getElementById("reelThreeUp").innerHTML = imgBar;
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
    if(document.getElementById("reelOne").innerHTML===(machine.symbolOne)){
        if(document.getElementById("reelTwo").innerHTML===(machine.symbolOne)){
            machine.hold = machine.hold + 2;
        } else if(document.getElementById("reelThree").innerHTML===(machine.symbolOne)){
            machine.hold = machine.hold + 2;
        }
    } else if(document.getElementById("reelTwo").innerHTML===(machine.symbolOne)){
        if(document.getElementById("reelThree").innerHTML===(machine.symbolOne)){
            machine.hold = machine.hold + 2;
        }
    }
}
//x2 Two
function doubleTwo(){
    if(document.getElementById("reelOne").innerHTML===(machine.symbolTwo)){
        console.log("found 2 on 1")
        if(document.getElementById("reelTwo").innerHTML===(machine.symbolTwo)){
            console.log("found 2 on 2 (POINTS!)")
            machine.hold = machine.hold + 2;
        } else if(document.getElementById("reelThree").innerHTML===(machine.symbolTwo)){
            console.log("found 2 on 3 (POINTS!)")
            machine.hold = machine.hold + 2;
        }
    } else if(document.getElementById("reelTwo").innerHTML===(machine.symbolTwo)){
        console.log("found 2 on 2")
        if(document.getElementById("reelThree").innerHTML===(machine.symbolTwo)){
            console.log("found 2 on 3 (POINTS!)")
            machine.hold = machine.hold + 2;
        }
    }
}
//x2 Three
function doubleThree(){
    if(document.getElementById("reelOne").innerHTML===(machine.symbolThree)){
        if(document.getElementById("reelTwo").innerHTML===(machine.symbolThree)){
            machine.hold = machine.hold + 2;
        } else if(document.getElementById("reelThree").innerHTML===(machine.symbolThree)){
            machine.hold = machine.hold + 2;
        }
    } else if(document.getElementById("reelTwo").innerHTML===(machine.symbolThree)){
        if(document.getElementById("reelThree").innerHTML===(machine.symbolThree)){
            machine.hold = machine.hold + 2;
        }
    }
}
//x2 Four
function doubleFour(){
    if(document.getElementById("reelOne").innerHTML===(imgBar)){
        if(document.getElementById("reelTwo").innerHTML===(imgBar)){
            machine.hold = machine.hold + 2;
        } else if(document.getElementById("reelThree").innerHTML===(imgBar)){
            machine.hold = machine.hold + 2;
        }
    } else if(document.getElementById("reelTwo").innerHTML===(imgBar)){
        if(document.getElementById("reelThree").innerHTML===(imgBar)){
            machine.hold = machine.hold + 2;
        }
    }
}
//x2 Five
function doubleFive(){
    if(document.getElementById("reelOne").innerHTML===(machine.symbolFive)){
        if(document.getElementById("reelTwo").innerHTML===(machine.symbolFive)){
            machine.hold = machine.hold + 2;
        } else if(document.getElementById("reelThree").innerHTML===(machine.symbolFive)){
            machine.hold = machine.hold + 2;
        }
    } else if(document.getElementById("reelTwo").innerHTML===(machine.symbolFive)){
        if(document.getElementById("reelThree").innerHTML===(machine.symbolFive)){
            machine.hold = machine.hold + 2;
        }
    }
}
//x2 Six
function doubleSix(){
    if(document.getElementById("reelOne").innerHTML===(machine.symbolSix)){
        if(document.getElementById("reelTwo").innerHTML===(machine.symbolSix)){
            machine.hold = machine.hold + 2;
        } else if(document.getElementById("reelThree").innerHTML===(machine.symbolSix)){
            machine.hold = machine.hold + 2;
        }
    } else if(document.getElementById("reelTwo").innerHTML===(machine.symbolSix)){
        if(document.getElementById("reelThree").innerHTML===(machine.symbolSix)){
            machine.hold = machine.hold + 2;
        }
    }
}
//x3 One
function tripleOne(){
    if(document.getElementById("reelOne").innerHTML===(machine.symbolOne)){
        if(document.getElementById("reelTwo").innerHTML===(machine.symbolOne)){
            if(document.getElementById("reelThree").innerHTML===(machine.symbolOne)){
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
    if(document.getElementById("reelOne").innerHTML===(machine.symbolTwo)){
        if(document.getElementById("reelTwo").innerHTML===(machine.symbolTwo)){
            if(document.getElementById("reelThree").innerHTML===(machine.symbolTwo)){
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
    if(document.getElementById("reelOne").innerHTML===(machine.symbolThree)){
        if(document.getElementById("reelTwo").innerHTML===(machine.symbolThree)){
            if(document.getElementById("reelThree").innerHTML===(machine.symbolThree)){
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
    if(document.getElementById("reelOne").innerHTML===(imgBar)){
        if(document.getElementById("reelTwo").innerHTML===(imgBar)){
            if(document.getElementById("reelThree").innerHTML===(imgBar)){
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
    if(document.getElementById("reelOne").innerHTML===(machine.symbolFive)){
        if(document.getElementById("reelTwo").innerHTML===(machine.symbolFive)){
            if(document.getElementById("reelThree").innerHTML===(machine.symbolFive)){
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
    if(document.getElementById("reelOne").innerHTML===(machine.symbolSix)){
        if(document.getElementById("reelTwo").innerHTML===(machine.symbolSix)){
            if(document.getElementById("reelThree").innerHTML===(machine.symbolSix)){
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