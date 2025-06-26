const shortid = require("shortid");
const URL = require("../models/url");

//POST handler
async function handlegenerateNewURL(req,res){

    const body = req.body;
    const shortId = shortid();
    if(!body.url) return res.status(400).json({error: "URL is required"});
    await URL.create(
        {
            shortId: shortId,
            redirectURL: body.url,
            visitedHistory: [],
            createdBy: req.user._id
        }
    );
    return res.render("home", {
      id: shortId,
    });
    //return res.json({id: shortID});

}

// GET handler
async function handleRedirectURL(req, res) {
  const shortID = req.params.shortId;

  console.log("Requested shortID:", shortID); // ✅ Corrected log
  
  const entry = await URL.findOneAndUpdate(
    { shortId: shortID }, // ✅ Corrected variable usage
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

  // server side rendering

  async function handleServerSideRendering(req,res){
    const allURLs = await URL.find({});
    return res.render("home", { urls: allURLs });
  }

module.exports ={
    handlegenerateNewURL,
    handleRedirectURL,
    handlegetAnalytics,
    handleServerSideRendering
};