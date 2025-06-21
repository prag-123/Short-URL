const shortid = require("shortid");
const URL = require("../models/url");

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

module.exports ={
    handlegenerateNewURL
};