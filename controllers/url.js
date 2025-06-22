const shortid = require("shortid");
const URL = require("../models/url");

//POST handler
async function handlegenerateNewURL(req,res){

    const body = req.body;
    const shortID = shortid();
    if(!body.url) return res.status(400).json({error: "URL is required"});
    await URL.create(
        {
            shortId: shortID,
            redirectURL: body.url,
            visitedHistory: []
        }
    );

    return res.json({id: shortID});

}

// GET handler
async function handleRedirectURL(req, res) {
    const shortID = req.params.shortID;
  
    const entry = await URL.findOneAndUpdate(
      { shortId: shortID },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
  
    if (!entry) {
      return res.status(404).send("Short URL not found");
    }
  
    res.redirect(entry.redirectURL);
  }

  //Analystics handler

  async function handlegetAnalytics(req,res){
    const shortId = req.params.shortID;
    const result = await URL.findOne( {shortId} );
    return res.json({
        totalclicks: result.visitHistory.length, analytics: result.visitHistory
    });
  }

module.exports ={
    handlegenerateNewURL,
    handleRedirectURL,
    handlegetAnalytics
};