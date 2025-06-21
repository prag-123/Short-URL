const mongoose = require("mongoose");

async function connectTOMongooseDB(url){
    return mongoose.connect(url)
    .then(() => console.log('Mongo is connected'))
    .catch(err => console.error('Connection error', err));
}

module.exports ={
    connectTOMongooseDB, //Destructuring: You do this when the file exports multiple named things.
}