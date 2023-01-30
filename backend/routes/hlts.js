var express = require("express"); 
var router=express.Router(); 
const { performance } = require('perf_hooks');
let hltb = require('howlongtobeat');
let hltbService = new hltb.HowLongToBeatService();
const SteamAPI = require('steamapi');
const Mongoose = require('mongoose') 
const GameData = require('./HowLongData');
require('dotenv').config()
 router.get("/", async function(req,res){  
     res.send('worked!');
 });
router.post("/", async function(req,res){
   var steamURL = JSON.parse(JSON.stringify(req.body.STEAMURL))
   console.log('posted')
   if(steamURL.includes("http://steamcommunity.com/id/") || steamURL.includes("https://steamcommunity.com/id") || steamURL.includes("https://steamcommunity.com/profiles/")){
   data = await getData(steamURL);
   }else{
       data = 'URL invalid! Try again!'
   }
   res.send(data)
});
module.exports=router; 

async function getData(steamURL){ 
    var startTime = performance.now()
    console.log(process.env.MONG_USER)
    console.log(process.env.MONG_PASS)
    const dbURI = "mongodb+srv://"+process.env.MONG_USER+":"+process.env.MONG_PASS+"@hltsdb.czih2.mongodb.net/HowLongData?retryWrites=true&w=majority";
    try{ 
        await Mongoose.connect(dbURI, {useNewURlParser:true,useUnifiedTopology:true})
        console.log('connected to MongoDB ')
    }catch (err){ 
        console.log(err)
        console.log('failed to connect')
    }
    
       apiKey = process.env.API_KEY 
       const steam = new SteamAPI(apiKey);
       var steamid = await steam.resolve(steamURL) 
       gameList = await steam.getUserOwnedGames(steamid)
       userSum = await steam.getUserSummary(steamid); 
       pfp = userSum.avatar.large
       nick = userSum.nickname     
       dbList = await GameData.find(); 
       gameItemArray = [] 
       hltbGame = [] 
    
       for(let i=0;i<gameList.length;i++){
        gameName = gameList[i].name.replace(/[^\w\s]/gi, ' ').trim() 
        gameName = gameName.replace(/\s+/g, ' ').trim()
        dbIndex = dbList.findIndex(x => x.name === gameName)   
        if(dbIndex===-1){
            console.log(gameName)
           hltbGame = await hltbService.search(gameName)
           if(hltbGame.length!=0){
               gameItemArray.push(new game(pfp,nick,gameList[i].name,Math.round(gameList[i].playTime/60),hltbGame[0].gameplayMain,hltbGame[0].gameplayMainExtra,hltbGame[0].gameplayCompletionist,"http://howlongtobeat.com"+hltbGame[0].imageUrl,gameList[i].appID))
               const gameData = new GameData({
                name: gameName,
                howLong: hltbGame[0].gameplayMain,
                howLongPlus: hltbGame[0].gameplayMainExtra,
                howLongComplete: hltbGame[0].gameplayCompletionist, 
                image: hltbGame[0].imageUrl,
                appid: gameList[i].appID
            });
           res = await gameData.save()
           console.log(res)   
            }
        }else{ 
            gameItemArray.push(new game(pfp,nick,gameList[i].name,Math.round(gameList[i].playTime/60),dbList[dbIndex].howLong,dbList[dbIndex].howLongPlus,dbList[dbIndex].howLongComplete,"http://howlongtobeat.com"+dbList[dbIndex].image,dbList[dbIndex].appid))
        }
           console.log(i+1 + "/"+gameList.length) 
           //if(gameItemArray.length>=25){
             //  break; 
           }
       
           var endTime = performance.now()
           console.log(endTime-startTime)
           console.log(gameItemArray)
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
