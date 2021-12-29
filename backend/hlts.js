async function getData(){ 
let hltb = require('howlongtobeat');
let hltbService = new hltb.HowLongToBeatService();
const SteamAPI = require('steamapi');
require('dotenv').config()
//console.log(process.env);
apiKey = process.env.API_KEY 
const steam = new SteamAPI(apiKey);
var steamid = await steam.resolve('https://steamcommunity.com/id/ILOOVEYOU') 
gameList = await steam.getUserOwnedGames(steamid)
gameItemArray = [] 
hltbItem = [] 
hltbGame = [] 
for(let i=0;i<gameList.length;i++){
    currPlayer = await steam.getGamePlayers(gameList[i].appID) 
    hltbGame = await hltbService.search(gameList[i].name)
    if(hltbGame.length!=0){
        gameItemArray.push(new game(hltbGame[0].name,gameList[i].playTime/60,hltbGame[0].gameplayMain,hltbGame[0].gameplayMainExtra,hltbGame[0].gameCompletionist,"howlongtobeat.com/"+hltbGame[0].imageUrl,currPlayer))
    }
} 
console.log(gameItemArray)
}

function game(name,playTime,howLong,howLongPlus,howLongComplete,image,currentPlayers){ 
    this.name=name
    this.playTime = playTime
    this.howLong = howLong
    this.howLongPlus = howLongPlus 
    this.howLongComplete = howLongComplete
    this.image = image
    this.currentPlayers = currentPlayers
}

getData()
