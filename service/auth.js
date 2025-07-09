//Which user is currently logged in with which session ID?
//This is stateful - It's stored in memory → if the server restarts, all sessions are gone
//const sessionIdToUserMap = new Map(); //Creates a new JavaScript Map object.

// function setUser(id,user){
//     //Stores a user in the map.
//     sessionIdToUserMap.set(id,user);
// }

// function getUser(id){
//     //Retrieves the user for a session ID.
//     return sessionIdToUserMap.get(id);
// }



//Stateless - using JWT

const jwt = require("jsonwebtoken"); //JWT library
const secret = "Prgya$1"; //Secret key to sign the token

function setUser(user){
   return jwt.sign({
    _id: user.id,
    email: user.email,
    role: user.role
   }, secret);
}

function getUser(token){

    if(!token) return null; 
    try {
        return jwt.verify(token,secret);
    } catch (error) {
        return null; 
    }
    
}

module.exports={
    setUser,
    getUser
};

