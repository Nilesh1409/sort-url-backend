const express = require("express");
const {registerUrl} = require("../handler/url");
const {getUrl} = require("../handler/geturl");

const urlRouter = express.Router();

urlRouter.post("/url",registerUrl);

const getShortUrl = express.Router();

getShortUrl.get("/url/:shortUrl",getUrl);

module.exports = {urlRouter,getShortUrl};