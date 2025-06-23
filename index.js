const express = require('express'); //Loads Express framework
const urlRoute = require("./routes/url"); // Direct assign: You do this when the file exports one main thing, local file
const path = require("path");
const {connectTOMongooseDB} = require("./connect"); //Destructuring: You do this when the file exports multiple named things.

const app = express(); //Creates an Express application object. This is your actual web server.

const PORT = 60001; //Defines the port number your server will listen on. It’s just a variable.


connectTOMongooseDB('mongodb://localhost:27017/short-url') //Actually connects your app to your MongoDB database.
.then(()=>console.log('Mongo iss connected'));

app.set("view engine", 'ejs');
app.set("views", path.resolve("./views"));
app.use(express.json()); //Parse JSON body
app.use("/url", urlRoute); //Mounts your router under the /url path.


app.listen(PORT, ()=> console.log(`Server started at port: ${PORT}`)); //Starts the HTTP server and listens for incoming requests.

