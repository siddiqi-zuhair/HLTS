let hltb = require('howlongtobeat');
let hltbService = new hltb.HowLongToBeatService();
const SteamAPI = require('steamapi');
const steam = new SteamAPI('steam token');
require('dotenv').config()
//hltbService.search('Kingdom Hearts').then(result => console.log(result));
const apikey = process.env.API_KEY; 
const steamid = "76561198976808628"
console.log("Test"); 