//import mongoose module 
const mongoose = require('mongoose');
//create match Schema
const matchSchema = mongoose.Schema({ //methode qui definit le schéma==ensemble d'attributs du model
    //attribut:type  //meme nominattions des attributs dans html formulaire ....
    scoreOne: Number,
    scoreTwo: Number,
    teamOne: String,
    teamTwo: String
}
);
//affect model name to Schema
const match = mongoose.model("Match", matchSchema);// model avec un nom "Match" et un schema qui est matchscema
// make match importable
module.exports = match;