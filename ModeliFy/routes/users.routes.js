const express = require("express");
const {getLogin,
    getRegister,
    getProfile,
    processRegister,
    editProfile,
    processLogin,
    logout,
    processUpdate,
    destroy} = require("../controllers/users.controllers");
const router = express.Router();
const {uploadUser} = require('../middlewares/multer');
const loggedMidleware = require("../middlewares/loggedMiddleware");
const guestAuth = require("../middlewares/guestAuth");
const { loginCheck } = require("../middlewares/validator");


// vista de login
router.get('/login', loggedMidleware, getLogin);
router.post('/login', loginCheck, processLogin);

//vista de register
router.get('/register', getRegister);
router.post('/register',uploadUser.single('image'), processRegister);

//vista de perfil
router.get('/profile',guestAuth, getProfile);

//vista de edicion de perfil
router.get('/edit/:id', guestAuth, editProfile);
router.put('/edit/:id', uploadUser.single('image'), processUpdate);

//delete user
router.delete('/delete/:id', destroy);

//log out
router.get('/logout',logout);

module.exports = router;
