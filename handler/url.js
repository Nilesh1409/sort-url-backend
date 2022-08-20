const urldata = require("../database/urlsorter");
const shortid = require('shortid');
const Register = require("../database/register");

async function registerUrl (req,res) {
    let userId = req.context.user;
    
    if(!userId) {
        res.status(400).send("user is not logged in");
        return;
    }
    let user = await Register.findOne({_id: userId._id});
    if(!user) {
        res.status(400).send("user does not exist");
        return;
    }


    let {url} = req.body;
    // console.log("url",Url);
    if(!url) {
        res.status(400).send("url is required");
        return;

    }
 
    try {
        let urlData = await urldata.findOne({oldurl: url});
        
         // if url is date is 2 days old then delete it
         


        if(urlData) {
            if(urlData.date.getDate() < new Date().getDate() - 2) {
                await url.findByIdAndDelete(urlData._id);
                let newUrl = shortid.generate();
    
                let shortUrl = await urldata.create({oldurl: url, shortUrl: newUrl});
                res.status(200).send(shortUrl);
                return;
                }

            res.status(200).send(urlData);
            return;
        }
        console.log(url)

        let newUrl = shortid.generate();

        let shortUrl = await urldata.create({oldurl: url, shortUrl: newUrl});
        res.status(200).send(shortUrl);
    } catch (error) {
        res.status(500).send(error);
    }

}




module.exports = {registerUrl};