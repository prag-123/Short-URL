const express = require("express");
const {
  handlegenerateNewURL,
  handleRedirectURL,
  handlegetAnalytics,
  handleServerSideRendering,
} = require("../controllers/url");

const router = express.Router();

// POST: create new short URL
router.post("/", handlegenerateNewURL); // handles POST /url

// Server-side rendering for testing
router.get('/test', handleServerSideRendering);

// ⚠️ Define this FIRST to avoid conflict with :shortId
router.get('/analytics/:shortID', handlegetAnalytics); // handles GET /url/analytics/:shortID

// GET: redirect using short ID
router.get('/:shortId', handleRedirectURL); // handles GET /url/:shortId

module.exports = router;
