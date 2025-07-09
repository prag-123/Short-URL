const express = require("express");
const {handleUserSignUp, handleUserlogin} = require("../controllers/user");

const router = express.Router();

router.post('/',handleUserSignUp ); //user/
router.post('/login',handleUserlogin ); //user/login

module.exports = router;