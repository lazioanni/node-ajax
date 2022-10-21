var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

require('dotenv').config();

const uri = process.env.ATLAS_URI;

mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true});

const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("Connected to Database Successfully!!!");
})

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username:{type:String,
        required:[true,'Username is required field'],
        trim:true,
        lowercase:true,
        unique:true
    },
    name:{type:String,
        required:[true,'Name is required field']},
    surname:{type:String,
            required:[true,'Surname is required field']},
    category:{type:String,
                required:[true,'Category is required field']},
    email:{type:String,
                    required:[true,'Email is required field'],
                    trim:true,
                    lowercase:true,
                    unique:true,
                    match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    "Email adress is not valid"]
                }
    });

    userSchema.plugin(uniqueValidator);

    module.exports = mongoose.model('User',userSchema);