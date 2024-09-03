//import mongoose module 
const mongoose = require('mongoose');
//create User Schema
const userSchema = mongoose.Schema({
    //attribut:type
    firstName: String,
    lastName: String,
    email: String,
    tel: String,
    pwd: String,
    role:String,
    avatar:String // pour y mettre le chemein
   // confPwd: String PAS DAND LA BD
}
);
//affect model name to Schema
const user = mongoose.model("User", userSchema);
// make User importable
module.exports = user;