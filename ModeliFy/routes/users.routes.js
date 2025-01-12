const express = require("express");
const usersController = require("../controllers/users.controllers");
const router = express.Router();

// vista de login
router.get('/login', usersController.getLogin);

//vista de register
router.get('/register', usersController.getRegister);

module.exports = router;
