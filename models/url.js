//Mongoose Model for storing shortened URLs
const mongoose = require("mongoose"); //Loads the Mongoose library.

const urlSchema = new mongoose.Schema({ //Defines the schema (blueprint) for each URL document in the database.

    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL:{
        type: String,
        required: true
    },
    visitHistory: [{timestamp: {type: Number}}]

}, 
{timestamps: true}
);

const URL = mongoose.model("url", urlSchema); //Creates a Mongoose model named
//In MongoDB, the collection name becomes "urls"

module.exports = URL; //Exports this model so you can use it in your controllers:


