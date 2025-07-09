const {v4: uuidv4}= require('uuid');
const User = require('../models/users');
const {setUser}= require("../service/auth");

async function handleUserSignUp(req, res){

    const {name, email, password} = req.body;
    console.log(name, email, password);

    if (!email || !name || !password) {
    return res.status(400).send("All fields are required");
}

    await User.create({
        name,
        email,
        password
    });

    return res.redirect('/');

}

async function handleUserlogin(req, res){

    const {email, password} = req.body;

    const user = await User.findOne({email, password});
    if(!user)
        return res.render("login",{
        error: "Invalid username or password"
    });

   //Stateful
    // const sessionId = uuidv4();
    // setUser(sessionId,user);
    // res.cookie('uid', sessionId);
    // return res.redirect('/');

    //Stateless
    const token = setUser(user);
    res.cookie('token', token); //sending token in cookie
    return res.redirect('/');

}

module.exports={
    handleUserSignUp,
    handleUserlogin
};