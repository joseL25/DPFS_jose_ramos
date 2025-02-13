const express = require("express");
const {gethome} = require("../controllers/index.controllers");
const router = express.Router();

// vista del home
router.get('/', gethome);
// router.get('/products/create', create);


module.exports = router;
