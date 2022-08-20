const Register = require("../database/register");
const jwt = require("jsonwebtoken");



async function registerUser(req,res){
    console.log("in registerUser");
    let user = req.body;
    console.log("user",user);
    

    if(!user.name || !user.email || !user.password){
        res.status(400).send("name, email and password are required");
    }
    // regex to validate email
    let nameCheck = "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$";
    let emailCheck = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
    let passwordCheck = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$";

    if(!user.name.match(nameCheck)) {
        res.status(400).send("name should be alphabets only");
        return;
    }
    if(!user.email.match(emailCheck)) {
        res.status(400).send("email is not valid");
        return;
    }
    if(!user.password.match(passwordCheck)) {
        res.status(400).send("password should be alphanumeric and at least 8 characters");
        return;
    }



    try {

        let userExists = await Register.findOne({email: user.email});
        if(userExists) {
            res.status(400).send("user already exists");
            return;
        }

        let userData = await Register.create(user);
        console.log(userData)
        res.status(200).send(userData);
    } catch (error) {
        res.status(500).send(error);
    }

}
let SECRET = "kjkdsfdso898hedsf"

// function which will login user and return token
async function loginUser(req,res){
    console.log("in loginUser");
    let user = req.body;
    
    if(!user.email || !user.password){  
        res.status(400).send("email and password are required");
        return;
    }
    try {
        let userData = await Register.findOne({email: user.email});
       
            
        if(!userData) {
            res.status(400).send("user does not exist");
            return;
        }
        if(userData.password !== user.password) {
            res.status(400).send("password is incorrect");
            return;
        }
        let token = jwt.sign({_id: userData._id}, SECRET);
        res.status(200).send({token: token});
    } catch (error) {
        res.status(500).send(error);
    }
}


module.exports = {registerUser,loginUser};