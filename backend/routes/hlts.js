var express = require("express"); 
var router=express.Router(); 

router.get("/", async function(req,res){ 
    sendArr = await getData() 
    res.send(sendArr);
}); 
module.exports=router; 

 async function getData(){ 
 let hltb = require('howlongtobeat');
     let hltbService = new hltb.HowLongToBeatService();
     const SteamAPI = require('steamapi');
    require('dotenv').config()

    apiKey = '416B1421E0EA403BA18B9D6F4977E010'
    console.log(apiKey)
    const steam = new SteamAPI(apiKey);
    var steamid = await steam.resolve('https://steamcommunity.com/id/ILOOVEYOU') 
    gameList = await steam.getUserOwnedGames(steamid)
    console.log(gameList.length) 
    gameItemArray = [] 
    hltbGame = [] 
    for(let i=0;i<gameList.length;i++){
        hltbGame = await hltbService.search(gameList[i].name)
        console.log(hltbGame.length) 
        if(hltbGame.length!=0){
            gameItemArray.push(new game(hltbGame[0].name,gameList[i].playTime/60,hltbGame[0].gameplayMain,hltbGame[0].gameplayMainExtra,hltbGame[0].gameCompletionist,"howlongtobeat.com/"+hltbGame[0].imageUrl))
        }
        //if(gameItemArray.length>=25){
          //  break; 
        }
     
    console.log('PogU')
    return gameItemArray
}

function game(name,playTime,howLong,howLongPlus,howLongComplete,image){ 
    this.name=name
    this.playTime = playTime
    this.howLong = howLong
    this.howLongPlus = howLongPlus 
    this.howLongComplete = howLongComplete
    this.image = image
  //  this.currentPlayers = currentPlayers
}
