const express = require("express");
const {getLogin,
    getRegister,
    getProfile,
    processRegister,
    editProfile,
    processLogin,
    logout,
    processUpdate,
    destroy} = require("../controllers/users.controller");
const router = express.Router();
const {uploadUser} = require('../middlewares/multer');
const loggedMidleware = require("../middlewares/loggedMiddleware");
const guestAuth = require("../middlewares/guestAuth");
const { loginCheck, registerCheck, editUserCheck } = require("../middlewares/validator");


// vista de login
router.get('/login', loggedMidleware, getLogin);
router.post('/login', loginCheck, processLogin);

//vista de register
router.get('/register', getRegister);
router.post('/register',uploadUser.single('image'), registerCheck, processRegister);

//vista de perfil
router.get('/profile',guestAuth, getProfile);

//vista de Administrador
// router.get('/admin', adminP);

//vista de edicion de perfil  guestAuth,
router.get('/edit/:id', editProfile);
router.put('/edit/:id', uploadUser.single('image'), editUserCheck, processUpdate);

//delete user
router.delete('/delete/:id', destroy);

//log out
router.get('/logout',logout);

module.exports = router;
