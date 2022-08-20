const url = require("../database/urlsorter");

async function getUrl (req,res) {
    console.log("in getUrl");
    console.log(req.path);
    let {shortUrl} = req.params;
    if(!shortUrl) {
        res.status(400).send("shortUrl is required");
        return;
    }
    try {
        let urlData = await url.findOne({shortUrl: shortUrl});

        if(urlData.date.getDate() < new Date().getDate() - 2) {
            await url.findByIdAndDelete(urlData._id);
            urlData = null;
            }
        if(!urlData) {
            res.status(400).send("url does not exist");
            return;
        }
        console.log(urlData);
       return res.status(200).send(urlData.oldurl);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {getUrl};