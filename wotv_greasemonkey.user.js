// ==UserScript==
// @name     WotV Timers
// @include  https://www.reddit.com/r/wotv_ffbe/*
// @version  1
// @grant    none
// ==/UserScript==

var timerBox;
var worldTime;
var dailyTime;
var shopTime;
var guildTime;
var bonusTime;

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}

function padTime(i) {
  if (i < 10) {i = "0" + i};
  return i;
}

function timersInit () { 
  
  timerBox = document.createElement("div"); 
  timerBox.style.position = "absolute";
  timerBox.style.top = "30px";
  timerBox.style.left = "10px";
  timerBox.style.zIndex = "100";
  
  timerBox.style.fontFamily = "monospace";
  timerBox.style.fontWeight = "bold";
  timerBox.style.fontSize = "1.3em";
  
  timerBox.style.color = "yellow";
  timerBox.style.textShadow = "1px 1px black";
  
  
  
  worldTime = document.createElement("div");
  worldTime.innerHTML = "World Time:  00:00:00";
  worldTime.style.marginBottom = "10px";
  timerBox.appendChild(worldTime);  

  dailyTime = document.createElement("div");
  dailyTime.innerHTML = "Daily Reset: 00:00:00";
  timerBox.appendChild(dailyTime);  
  
  shopTime = document.createElement("div");
  shopTime.innerHTML = "Shop Resets: 00:00:00";
  timerBox.appendChild(shopTime);  
  
  guildTime = document.createElement("div");
  guildTime.innerHTML = "Guild War Start: 00:00:00";
  timerBox.appendChild(guildTime);  
  
  bonusTime = document.createElement("div");
  bonusTime.innerHTML = "Monday Bonus:<br>  Exp Gil Ore Egg Pot Training";
  bonusTime.style.marginTop = "10px";
  timerBox.appendChild(bonusTime);
  
  
  
  var header = document.getElementById("header"); 
  document.body.insertBefore(timerBox, header); 
  
  timerUpdate();
}

function timerUpdate() {
  
  var now = new Date().addHours(-8);

  worldUpdate(now);
  dailyUpdate(now);
  shopUpdate(now);
  guildUpdate(now);
    
    
  var t = setTimeout(timerUpdate, 500);
}

function worldUpdate(now) {
  
  var h = now.getUTCHours();
  var m = padTime(now.getUTCMinutes());
  var s = padTime(now.getUTCSeconds());
  
  worldTime.innerHTML = "World Time: " +
  h + ":" + m + ":" + s;
}

function dailyUpdate(now) {
  var h = 23-(now.getUTCHours());
  var m = padTime(59-now.getUTCMinutes());
  var s = padTime(59-now.getUTCSeconds());
  
  dailyTime.innerHTML = "Daily Reset: " +
  h + ":" + m + ":" + s;
}

function shopUpdate(now) {
  var h = 5-(now.getUTCHours()%6);
  var m = padTime(59-now.getUTCMinutes());
  var s = padTime(59-now.getUTCSeconds());
  
  shopTime.innerHTML = "Shop Reset: " +
  h + ":" + m + ":" + s;
}

function guildUpdate(now) {
  
  if(now.getUTCHours() < 12) {
    var h = 11-(now.getUTCHours());
    var m = padTime(59-now.getUTCMinutes());
    var s = padTime(59-now.getUTCSeconds());
  
    guildTime.innerHTML = "Guild War Starts: " +
    h + ":" + m + ":" + s;
  }
  else{
    
    
  }

}

function bonusUpdate(now) {
}






document.body.onload = timersInit;


//Shop Reset
//Daily Reset
//2x: 

//Monday: EXP, Gil, Ore, Egg, Pot, Training
//Tuesday: Fire, Wind
//Wednesday: Water Ice
//Thursday: Earth Dark
//Friday: Lightning Light
//Saturday: Unlimited Gil
//Sunday: Unlimited Gil
