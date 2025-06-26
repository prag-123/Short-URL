const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

}, {timestamps:true});

const User = mongoose.model("user", userSchema); // user is a name of model which is assigned in variable User

module.exports = User;
