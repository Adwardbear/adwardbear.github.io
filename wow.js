//ads armory code
var apikey = "subms2689aaadkt8k44hdz8fwhymkazg";

//future use
var epicGemCheck = null;

var auditCheck = null;

var offSet = 0;

/* ref

0 Hear
1 Neck
2 Shoulder
3 Shirt
4 Chest
5 Waist
6 Legs
7 Feet
8 Wrist
9 Hands
10 Finger1
11 Finger2
12 Trinket1
13 Trinket2
14 Back
15 MainHand
16 OffHand
17 Ranged
18 Tabard
*/

var region: "EU"
var charName: "Paracetamol"
var realmName: "Sylvanas"

//pull API
function armoryPull(region,charName,realmName) {
  if(!charName || !realmName)
  {
    return " "; //if nothing, dont call API
  }
  
  //sleep timer for prevent spam to API
  Utilities.sleep(Math.floor((Math.random() * 10000) + 1000));
  //grab character
  var charJSON = UrlFetchApp.fetch("https://"+region+".api.battle.net/wow/character/"+realmName+"/"+charName+"?fields=item,quests,achievements,audit,progression,feed,professions,talents&?locale=en_US&apikey="+apikey+"");
  var char = JSON.parse(charJSON.toString());
  
  //specs
  var mainSpec = "none";
  var offSpec = "none";
  
  if(char.talents[0].spec) //no main spec
  {
    if(char.talents[0].selected == true) //first spec selected, thats mainspec since youre using it
    {
      mainSpec = char.talents[0].spec.name;
    } 
    else // its not selected, use second
    {
      offSpec = char.talents[0].spec.name;
    }
  }
  
  if(char.talents[1].spec) // if dual spec
  {
    if(char.talents[1].selected == true) //2nd spec selected, thats mainspec since youre using it
    {
      mainSpec = char.talents[1].spec.name;
    } 
    else // its not selected, use second
    {
      offSpec = char.talents[1].spec.name;
    }
  }
  
  
  //figure out class
  var class = 0;
  
  if(char.class == "1")  { class = "Warrior"; }
  else if(char.class == "2")  { class = "Paladin"; }
  else if(char.class == "3")  { class = "Hunter"; }
  else if(char.class == "4")  { class = "Rogue"; }
  else if(char.class == "5")  {class = "Priest"; }
  else if(char.class == "6")  {class = "Death Knight";}
  else if(char.class == "7")  {class = "Shaman";}
  else if(char.class == "8")  {class = "Mage";}
  else if(char.class == "9")  {class = "Warlock";}
  else if(char.class == "10")  {class = "Monk"}
  else if(char.class == "11")  {class = "Druid" }
  else  {class == "Broken"}
  
  var prof1 = "none";
  
  if(char.professions.primary[0]) {
    prof1 = char.professions.primary[0].name;
  }
  var prof1Rank = "none";
  
  if(char.professions.primary[0]) {
    prof1Rank = char.professions.primary[0].rank;
  }
  
  var prof2 = "none";
  
  if(char.professions.primary[1]) {
    prof2 = char.professions.primary[1].name;
  }
  var prof2Rank = "none";
  
  if(char.professions.primary[1]) {
    prof2Rank = char.professions.primary[1].rank;
  }
  
  var secProf1 = "none";
  
  if(char.professions.secondary[0]) {
    secProf1 = char.professions.secondary[0].name;
  }
  var secProf1Rank = "none";
  
  if(char.professions.secondary[0]) {
    secProf1Rank = char.professions.secondary[0].rank;
  }
  
  var secProf2 = "none";
  
  if(char.professions.secondary[1]) {
    secProf2 = char.professions.secondary[1].name;
  }
  var secProf2Rank = "none";
  
  if(char.professions.secondary[1]) {
    secProf2Rank = char.professions.secondary[1].rank;
  }
  
  var secProf3 = "none";
  
  if(char.professions.secondary[2]) {
    secProf3 = char.professions.secondary[2].name;
  }
  var secProf3Rank = "none";
  
  if(char.professions.secondary[2]) {
    secProf3Rank = char.professions.secondary[2].rank;
  }
  
  var secProf4 = "none";
  
  if(char.professions.secondary[3]) {
    secProf4 = char.professions.secondary[3].name;
  }
  var secProf4Rank = "none";
  
  if(char.professions.secondary[3]) {
    secProf4Rank = char.professions.secondary[3].rank;
  }
  
  
  var charInfo = new Array(
    class,
    //char.level,
    //prof1,
    //prof1Rank,
    //prof2,
    //prof2Rank,
    //secProf1,
    //secProf1Rank,
    //secProf2,
    //secProf2Rank,
    //secProf3,
    //secProf3Rank,
    //secProf4,
    //secProf4Rank,
    //mainSpec,
    //offSpec
    
  )
  return charInfo
  }