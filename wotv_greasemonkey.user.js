// ==UserScript==
// @name     WotV Timers
// @author   Kataiki
// @include  https://www.reddit.com/r/wotv_ffbe/*
// @include  https://old.reddit.com/r/wotv_ffbe/*
// @version  1
// @grant    none
// ==/UserScript==

var timerBox;
var worldTime;
var dailyTime;
var shopTime;
var summonTime;
var guildTime;
var bonusTime;


//Options
var align = "left";  //Box alignment on page: left,right
var background = true; //Add background to box for readability: true,false
//var server = "JP"; //Which server timer to use: GL,JP

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}

function padTime(i) {
  if (i < 10) {i = "0" + i};
  return i;
}

function formatTime(h,m,s, max) {
	var color = "white";
  if(h == 0 && m < 30) { color = "red"; }
  if(h == max-1 && m > 30) { color = "lime" }
  
  return "<span style='color:" + color + "'>" +
  h + "h " + m + "m " + s +"s</span>";
  
}

function timersInit () { 
  
  timerBox = document.createElement("div"); 
  timerBox.style.position = "absolute";
  timerBox.style.padding = "5px";
  timerBox.style.zIndex = "100";
  
  //timerBox.style.border = "1px solid blue";
  
  timerBox.style.fontFamily = "monospace";
  timerBox.style.fontWeight = "bold";
  timerBox.style.fontSize = "1.3em";
  
  timerBox.style.color = "white";
  timerBox.style.textShadow = "1px 1px black";
  
  if(background){
    timerBox.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    timerBox.style.borderRadius = "10px";
  }
  
  worldTime = document.createElement("div");
  worldTime.style.marginBottom = "10px";
  worldTime.style.fontSize = "1.1em";
  timerBox.appendChild(worldTime);  

  dailyTime = document.createElement("div");
  dailyTime.style.display = "flex";
  dailyTime.style.justifyContent = "space-between";
  timerBox.appendChild(dailyTime);  
  
  shopTime = document.createElement("div");
  shopTime.style.display = "flex";
  shopTime.style.justifyContent = "space-between";
  timerBox.appendChild(shopTime);  
  
  summonTime = document.createElement("div");
  summonTime.style.display = "flex";
  summonTime.style.justifyContent = "space-between";
  timerBox.appendChild(summonTime);  
  
  guildTime = document.createElement("div");
  guildTime.style.display = "flex";
  guildTime.style.justifyContent = "space-between";
  timerBox.appendChild(guildTime);  
  
  bonusTime = document.createElement("div");
  bonusTime.style.marginTop = "10px";
  timerBox.appendChild(bonusTime);
  
  
  
  //Old Reddit
  var header = document.getElementById("header"); 
  if(header != null) {
		timerBox.style.top = "30px";
  }
  //New Reddit
  else {
    header = document.getElementById("2x-container");
    timerBox.style.top = "55px";
  }
  
  if(align == "left") {
    timerBox.style.left = "10px";
  }
  else if (align =="right") {
    timerBox.style.right = "10px";
  }
  
  document.body.insertBefore(timerBox, header); 
  
  timerUpdate();
}

function timerUpdate() {
  var now = new Date().addHours(-8);

  worldUpdate(now);
  dailyUpdate(now);
  shopUpdate(now);
  summonUpdate(now);
  guildUpdate(now);
  bonusUpdate(now);
    
  var t = setTimeout(timerUpdate, 500);
}

function worldUpdate(now, server) {
  var h = now.getUTCHours();
  var m = padTime(now.getUTCMinutes());
  var s = padTime(now.getUTCSeconds());
  
  worldTime.innerHTML = "GL World Time:&nbsp;" +
    h + ":" + m + ":" + s;
}

function dailyUpdate(now) {
  var h = 23-(now.getUTCHours());
  var m = padTime(59-now.getUTCMinutes());
  var s = padTime(59-now.getUTCSeconds());
  
  dailyTime.innerHTML = "<span>Daily Reset:&nbsp;</span>" +
    formatTime(h,m,s,24);
}

function shopUpdate(now) {
  var h = 5-(now.getUTCHours()%6);
  var m = padTime(59-now.getUTCMinutes());
  var s = padTime(59-now.getUTCSeconds());
  
  shopTime.innerHTML = "<span>Shop Reset:&nbsp;</span>" + 
    formatTime(h,m,s, 6);
}

function summonUpdate(now) {
  var h = 7-(now.getUTCHours()%8);
  var m = padTime(59-now.getUTCMinutes());
  var s = padTime(59-now.getUTCSeconds());
  
  summonTime.innerHTML = "<span>N Summon Reset:&nbsp;</span>" +
    formatTime(h,m,s,8);
}


function guildUpdate(now) {
  var gwStart = 13;
  var gwEnd = 23;
  
  if(now.getUTCHours() < gwStart) {
    var h = (gwStart-1)-(now.getUTCHours());
    var m = padTime(59-now.getUTCMinutes());
    var s = padTime(59-now.getUTCSeconds());
  
    guildTime.innerHTML = "Guild War Starts:&nbsp;" +
    formatTime(h,m,s,0);
  }
  else if(now.getUTCHours() < gwEnd){
    var h = (gwEnd-1)-(now.getUTCHours());
    var m = padTime(59-now.getUTCMinutes());
    var s = padTime(59-now.getUTCSeconds());
  
    guildTime.innerHTML = "Guild War Ends:&nbsp;" +
      formatTime(h,m,s,0);
  }
  else{
    guildTime.innerHTML = "Guild War Concluded"
  }

}


var bonusList = ["Sunday Bonus:<br>&nbsp;Unlimited Gil Chamber",
                 "Monday Bonus:<br>&nbsp;2x EXP Gil Ore Eggs Pots",
                 "Tuesday Bonus:<br>&nbsp;2x Fire & Wind Chambers",
                 "Wednesday Bonus:<br>&nbsp;2x Water & Ice Chambers",
                 "Thursday Bonus:<br>&nbsp;2x Earth & Dark Chambers",
                 "Friday Bonus:<br>&nbsp;2x Lightning & Light Chambers",
                 "Saturday Bonus:<br>&nbsp;2x Advanced Training Chamber<br>&nbsp;Unlimited Gil & Ore Chamber"
                ]

function bonusUpdate(now) {
  bonusTime.innerHTML = bonusList[now.getUTCDay()];
}

document.body.onload = timersInit;
