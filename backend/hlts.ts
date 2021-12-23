import { HowLongToBeatService, HowLongToBeatEntry } from 'howlongtobeat';

let hltbService = new HowLongToBeatService();
hltbService.search('Nioh').then(result => console.log(result));
