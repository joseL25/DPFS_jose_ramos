const express = require("express");
const {gethome, create} = require("../controllers/index.controllers");
const router = express.Router();
const multer = require("multer");

// vista del home
router.get('/', gethome);
// router.get('/product/create', create);


module.exports = router;
