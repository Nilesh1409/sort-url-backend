const url = require("../database/urlsorter");
const shortid = require('shortid');

async function registerUrl (req,res) {
    // let {user} = req,body
    // console.log("user",user);
    let {Url} = req.body;
    if(!Url) {
        res.status(400).send("url is required");
        return;
    }
    try {
        let urlData = await url.findOne({url: Url});

         // if url is date is 2 days old then delete it
         if(urlData.date.getDate() < new Date().getDate() - 2) {
            await url.findByIdAndDelete(urlData._id);
            let newUrl = shortid.generate();

            let shortUrl = await url.create({url: Url, shortUrl: newUrl});
            res.status(200).send(shortUrl);
            }


        if(urlData) {
            res.status(200).send(urlData);
            return;
        }

        let newUrl = shortid.generate();

        let shortUrl = await url.create({url: Url, shortUrl: newUrl});
        res.status(200).send(shortUrl);
    } catch (error) {
        res.status(500).send(error);
    }

}

async function getUrl (req,res) {
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
        res.status(200).send(urlData.url);
    } catch (error) {
        res.status(500).send(error);
    }
}


module.exports = {registerUrl, getUrl};