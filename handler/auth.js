const express = require("express");
const jwt = require("jsonwebtoken");
const Register = require("../database/register");

let SECRET = "kjkdsfdso898hedsf"

// write auth middleware function and export it
async function auth(req,res,next) {
    let {token} = req.headers;

    if(!token) {
        res.status(401).send("token is required");
        return;
    }
    jwt.verify(token, SECRET, (err,decoded) => { 
        if(err) {
            res.status(401).send("invalid token");
            return;
        }
        try {
            let userDetail = Register.findOne( decoded._id);
            if(!userDetail) {
                res.status(401).send("invalid token");
                return;
            }
            req.context = {user: decoded};
            next();
        } catch (error) {
            console.log(error);
        }
      
    }
    )
}

module.exports = auth;
