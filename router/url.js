const express = require("express");
const {registerUrl,getUrl} = require("../handler/url");

const urlRouter = express.Router();

urlRouter.post("/url",registerUrl);
urlRouter.get("/url/:shortUrl",getUrl);

module.exports = urlRouter;