const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
    
})

const Url = mongoose.model("url", urlSchema);

module.exports = Url;