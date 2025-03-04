const express = require("express");
const {getLogin,
    getRegister,
    getProfile,
    processRegister} = require("../controllers/users.controllers");
const router = express.Router();



// vista de login
router.get('/login', getLogin);

//vista de register
router.get('/register', getRegister);
router.post('/register', processRegister);

//vista de perfil
router.get('/profile', getProfile);

module.exports = router;
