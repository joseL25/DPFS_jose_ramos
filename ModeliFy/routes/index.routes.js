const express = require("express");
const {gethome} = require("../controllers/index.controller");
const router = express.Router();

// vista del home
router.get('/', gethome);


module.exports = router;
