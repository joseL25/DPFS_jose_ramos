const express = require("express");
const indexController = require("../controllers/index.controllers");
const router = express.Router();

// vista del home
router.get('/', indexController.gethome);

module.exports = router;
