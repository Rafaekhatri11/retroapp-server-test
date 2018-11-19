const mongoose= require('mongoose');
const Schema = mongoose.Schema;


const Createretro = new Schema({
    
    useruid : String,
    projectname : String,
    sprintnumber: String,
    templatename : String,
    retrocategory1 : String,
    retrocategory2: String,
    retrocategory3 : String,
    retrocategory4: String,
    
 
})



module.exports = mongoose.model('createretro',Createretro);