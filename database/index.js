const mongoose = require("mongoose");

async function database() {

    try {
        await mongoose.connect("mongodb://localhost:27017/urlshortner")
        console.log("connection to database is successful");
    } catch (error) {
        console.log("connection to database is failed");
    } 
}

module.exports = database;