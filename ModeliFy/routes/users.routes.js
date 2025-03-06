const express = require("express");
const {getLogin,
    getRegister,
    getProfile,
    processRegister,
    editProfile,
    processLogin,
    logout} = require("../controllers/users.controllers");
const router = express.Router();
const {uploadUser} = require('../middlewares/multer');
const loggedMidleware = require("../middlewares/loggedMiddleware");
const guestAuth = require("../middlewares/guestAuth");


// vista de login
router.get('/login', loggedMidleware, getLogin);
router.post('/login', processLogin);

//vista de register
router.get('/register', getRegister);
router.post('/register',uploadUser.single('image'), processRegister);

//vista de perfil
router.get('/profile',guestAuth, getProfile);

router.get('/edit', editProfile);

router.get('/logout',logout);

module.exports = router;
