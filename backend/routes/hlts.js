var express = require("express"); 
var router=express.Router(); 
// router.get("/", async function(req,res){ 
//     sendArr = await getData() 
//     res.send(sendArr);
// });
router.post("/", async function(req,res){
   var steamURL = JSON.parse(JSON.stringify(req.body.STEAMURL))
   if(steamURL.includes("http://steamcommunity.com/id/") || steamURL.includes("https://steamcommunity.com/id") || steamURL.includes("https://steamcommunity.com/profiles/")){
   data = await getData(steamURL);
   }else{
       data = 'URL invalid! Try again!'
   }
   res.send(data)
});
module.exports=router; 

 async function getData(steamURL){ 
 let hltb = require('howlongtobeat');
     let hltbService = new hltb.HowLongToBeatService();
     const SteamAPI = require('steamapi');
    require('dotenv').config()
    apiKey = process.env.API_KEY 
    const steam = new SteamAPI(apiKey);
    var steamid = await steam.resolve(steamURL) 
    gameList = await steam.getUserOwnedGames(steamid)
    userSum = await steam.getUserSummary(steamid); 
    pfp = userSum.avatar.large
    nick = userSum.nickname  
    gameItemArray = [] 
    hltbGame = [] 
    for(let i=0;i<gameList.length;i++){
        gameName = gameList[i].name.replace(/[^\w\s]/gi, ' ')
        hltbGame = await hltbService.search(gameName)
        if(hltbGame.length>0){
            gameItemArray.push(new game(nick,pfp,gameList[i].name,Math.round(gameList[i].playTime/60),hltbGame[0].gameplayMain,hltbGame[0].gameplayMainExtra,hltbGame[0].gameplayCompletionist,"http://howlongtobeat.com"+hltbGame[0].imageUrl,gameList[i].appID))
        }
        console.log(i+1 + "/"+gameList.length) 
        //if(gameItemArray.length>=25){
          //  break; 
        }
     
    return gameItemArray
}

function game(userName, userPfp, name,playTime,howLong,howLongPlus,howLongComplete,image,appid){ 
    this.userName = userName 
    this.userPfp = userPfp 
    this.name=name
    this.playTime = playTime
    this.howLong = howLong
    this.howLongPlus = howLongPlus 
    this.howLongComplete = howLongComplete
    this.image = image
    this.appid = appid 
  //  this.currentPlayers = currentPlayers
}
