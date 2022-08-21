const express = require("express");
const database = require("./database/index");
const auth = require("./handler/auth");
const {urlRouter,getShortUrl} = require("./router/url");
const userRouter = require("./router/user");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());

app.use((req,res,next) =>{
    console.log("request is made to: ",req.originalUrl);
    console.log("request body",req.body);
    next();

})

app.use(userRouter);
app.use(getShortUrl);
app.use(auth,urlRouter);



database()
.then(() => app.listen(8080, () => { console.log("server is running on port 8080") }
))
.catch(err => console.log(err));