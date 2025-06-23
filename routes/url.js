const express = require("express");
const {handlegenerateNewURL,handleRedirectURL, handlegetAnalytics,handleServerSideRendering} = require("../controllers/url");
const router = express.Router(); //Creates a Router object — a mini app that you can attach routes to.

// POST: create new short URL
router.post("/", handlegenerateNewURL); //Defines a POST route at path /.

router.get('/test', handleServerSideRendering);
// GET: redirect using short ID
router.get('/:shortID', handleRedirectURL);

router.get('/analytics/:shortID',handlegetAnalytics);

module.exports = router; // Direct assign: You do this when the file exports one main thing.