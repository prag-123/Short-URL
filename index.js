const express = require('express');
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const path = require("path");
const { checkForAuthentication,restrictTo } = require("./middlewares/auth");
const cookieParser = require("cookie-parser");
const { connectTOMongooseDB } = require("./connect");

const app = express();
const PORT = 50001;

// Connect to MongoDB
connectTOMongooseDB('mongodb://localhost:27017/short-url')
  .then(() => console.log('Mongo is connected'));

// Setup view engine
app.set("view engine", 'ejs');
app.set("views", path.resolve("./views"));

// Middleware order matters
app.use(cookieParser()); // First: parse cookies
app.use(express.json()); // Then: parse JSON
app.use(express.urlencoded({ extended: false })); // Then: parse form data
app.use(checkForAuthentication);

// Routes
app.use("/url",restrictTo(["NORMAL", "ADMIN"]), urlRoute); // Protected
app.use("/user", userRoute); // Public
app.use("/",  staticRoute); // Public

// Start server
app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
