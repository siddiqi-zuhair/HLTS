var express = require("express"); 
var router=express.Router(); 
// router.get("/", async function(req,res){ 
//     sendArr = await getData() 
//     console.log(sendArr)
//     console.log(sendArr[0].name)
//     res.send(sendArr);
// });
router.post("/", async function(req,res){
   var steamURL = JSON.parse(JSON.stringify(req.body.STEAMURL))
   console.log(steamURL)
   console.log(steamURL.substring(0,29)) 
   if(steamURL.includes("http://steamcommunity.com/id/")){
   data = await getData(steamURL);
   console.log("swag")
   }else{
       data = 'URL invalid! Try again!'
       console.log(data) 
   }
   res.send(data)
});
module.exports=router; 

 async function getData(steamURL){ 
 let hltb = require('howlongtobeat');
     let hltbService = new hltb.HowLongToBeatService();
     const SteamAPI = require('steamapi');
    require('dotenv').config()
    console.log(steamURL) 
    apiKey = process.env.API_KEY 
    const steam = new SteamAPI(apiKey);
    var steamid = await steam.resolve(steamURL) 
    console.log(steamid) 
    gameList = await steam.getUserOwnedGames(steamid)
    gameItemArray = [] 
    hltbGame = [] 
    for(let i=0;i<25;i++){
        hltbGame = await hltbService.search(gameList[i].name)
        console.log(hltbGame.length) 
        if(hltbGame.length!=0){
            gameItemArray.push(new game(hltbGame[0].name,Math.round(gameList[i].playTime/60),hltbGame[0].gameplayMain,hltbGame[0].gameplayMainExtra,hltbGame[0].gameCompletionist,"howlongtobeat.com/"+hltbGame[0].imageUrl))
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
