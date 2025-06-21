const express = require("express");
const {handlegenerateNewURL} = require("../controllers/url");
const router = express.Router(); //Creates a Router object — a mini app that you can attach routes to.

router.post("/", handlegenerateNewURL); //Defines a POST route at path /.

module.exports = router; // Direct assign: You do this when the file exports one main thing.