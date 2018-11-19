const mongoose= require('mongoose');
const Schema = mongoose.Schema;


const Createuser = new Schema({
   // id : new mongoose.Types.ObjectId,
    Firstname : String,
    Lastname : String,
    Email: String,
    Pass: String,
    Status: String

})



module.exports = mongoose.model('createuser',Createuser);