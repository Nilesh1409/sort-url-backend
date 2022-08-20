const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    oldurl: {
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

const urldata = mongoose.model("urldata", urlSchema);

module.exports = urldata;