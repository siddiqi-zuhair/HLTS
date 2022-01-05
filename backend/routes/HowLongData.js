const Mongoose = require('mongoose');  
const Schema = Mongoose.Schema; 

const howLongDataSchema = new Schema({
    name: {
        type: String,
        required: true 
    },
    howLong: { 
        type: Number,
        required: true 
    },
        howLongPlus: {
        type: Number,
        required: true  
    }, 
    howLongComplete: {
        type: Number, 
        required: true 
    },
    image: { 
        type: String, 
        required: true 
    }, 
    appid: { 
        type: String, 
        required: true 
    } 
}, { timestamps:true });

const GameData = Mongoose.model('GameData', howLongDataSchema);
module.exports = GameData;