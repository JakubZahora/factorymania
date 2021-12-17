$( document ).ready(function() {
  ajaxl();
  updatePage();
  document.getElementById("factoryDiv").style.display = "none";
  document.getElementById("upgradeDiv").style.display = "none";
  console.log( "ready!" );
});

var mine = document.getElementById("oreMine");
var factory = document.getElementById("factoryDiv");
var upgrades = document.getElementById("upgradeDiv");

var gameData = {
    money: 0,
    iron: 0,
    ironBars: 0,
    ironRichness: 1,
    copper: 0,
    copperSheets: 0,
    copperRichness: 1,
    ironDrill: 0,
    copperDrill: 0,
    orePerClick: 1,
    upgradePickaxeCost: 10
  }

function reset() {
  var resetData = {
    money: 0,
    iron: 0,
    ironBars: 0,
    ironRichness: 1,
    copper: 0,
    copperSheets: 0,
    copperRichness: 1,
    ironDrill: 0,
    copperDrill: 0,
    orePerClick: 1,
    upgradePickaxeCost: 10
  }
  gameData = resetData;
  updatePage();
}

function factoryView() {
  document.getElementById("upgradeDiv").style.display = "none";
  document.getElementById("oreMine").style.display = "none";
  document.getElementById("factoryDiv").style.display = "block";
}

function mineView() {
  document.getElementById("upgradeDiv").style.display = "none";
  document.getElementById("oreMine").style.display = "block";
  document.getElementById("factoryDiv").style.display = "none";
}

function upgradeView() {
  document.getElementById("upgradeDiv").style.display = "block";
  document.getElementById("oreMine").style.display = "none";
  document.getElementById("factoryDiv").style.display = "none";
}

function purchaseIronDrill() {
  if (gameData.money >= 100) {
    gameData.money -= 100;
    gameData.ironDrill = 1;
    document.getElementById('idrillB').onclick = null;
    updatePage();
  }
}

function purchaseCopperDrill() {
  if (gameData.money >= 100) {
    gameData.money -= 100;
    gameData.copperDrill = 1;
    document.getElementById('cdrillB').onclick = null;
    updatePage();
  }
}

function mineIron() {
    gameData.iron += (gameData.orePerClick*gameData.ironRichness);
    updatePage();
}

function smeltIron() {
  gameData.ironBars += Math.floor(gameData.iron / 2);
  gameData.iron = 0;
  updatePage();
}

function mineCopper() {
  gameData.copper += (gameData.orePerClick*gameData.copperRichness);
  updatePage();
}

function smeltCopper() {
  gameData.copperSheets += Math.floor(gameData.copper / 2);
  gameData.copper = 0;
  updatePage();
}

function sellIronBars() {
  var ironBarValue = 2;
  value = gameData.ironBars * ironBarValue;
  gameData.money += value;
  gameData.ironBars = 0;
  updatePage();
}

function sellCopperSheets() {
  var copperSheetValue = 2;
  value = gameData.copperSheets * copperSheetValue;
  gameData.money += value;
  gameData.copperSheets = 0;
  updatePage();
}

function updatePage() {
  gMoney = gameData.money.toLocaleString('en', {useGrouping:true});
  gCost = gameData.upgradePickaxeCost.toLocaleString('en', {useGrouping:true});
  document.getElementById("gameMoney").innerHTML = "$"+gMoney;
  document.getElementById("ironMined").innerHTML = gameData.iron;
  document.getElementById("ironBars").innerHTML = gameData.ironBars;
  document.getElementById("copperMined").innerHTML = gameData.copper;
  document.getElementById("copperSheets").innerHTML = gameData.copperSheets;
  document.getElementById("pickCost").innerHTML = "$"+gCost;;
  document.getElementById("pickaxeLevel").innerHTML = gameData.orePerClick;
}
  
function upgradePickaxe() {
    if (gameData.money >= gameData.upgradePickaxeCost) {
      gameData.money -= gameData.upgradePickaxeCost
      gameData.orePerClick += 1
      gameData.upgradePickaxeCost *= 2
      updatePage();
    }
}

var gid = setInterval(function() {
  if (gameData.ironDrill === 1) {
    mineIron();
  }
}, 1000);

var gid = setInterval(function() {
  if (gameData.copperDrill === 1) {
    mineCopper();
  }
}, 1000);



var sid = setInterval(ajaxf, 1000);

function ajaxl() {
  $.get("/user/load", function(data, status){
    var obj = jQuery.parseJSON(data);
    Object.keys(obj).forEach(function(el){
      obj[el] = parseInt(obj[el])
    })
    console.log(obj);
    gameData = obj;
  });
  updatePage();
}

function ajaxf() {
  $.ajax({
    type: 'PUT',
    url: '/user/save',
    async: true,
    data: gameData,
    dataType: "json",
  })
}
