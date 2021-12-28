let hltb = require('howlongtobeat');
let hltbService = new hltb.HowLongToBeatService();
const SteamAPI = require('steamapi');
require('dotenv').config()
//console.log(process.env);
apiKey = process.env.API_KEY 
const steam = new SteamAPI(apiKey);
var steamid =steam.resolve('https://steamcommunity.com/id/ILOOVEYOU').then(id => { 
console.log(id)     
 steamid = id 
//console.log(steamid)
})
console.log(steamid) 
//hltbService.search('Kingdom Hearts').then(result => console.log(result));