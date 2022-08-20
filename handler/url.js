const url = require("../database/urlsorter");
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




module.exports = {registerUrl};