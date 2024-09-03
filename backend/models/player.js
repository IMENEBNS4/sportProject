//import mongoose module 
const { Type } = require('@angular-devkit/build-angular');
const mongoose = require('mongoose');
//create player Schema
const playerSchema = mongoose.Schema({
    //attribut:type
    name: String,
    number: Number,
    age: Number,
    position: String,
    tId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Player' //model name

}
});
//affect model name to Schema
const player = mongoose.model("Player", playerSchema);
// make player importable
module.exports = player;