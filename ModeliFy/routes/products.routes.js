const express = require("express");
const { product, 
        create, 
        edit, 
        save,
        update,
        destroy } = require("../controllers/products.controller");
// const path = require("path");
// const multer = require("multer");
const upload = require("../middlewares/multer.js");
const guestAuth = require("../middlewares/guestAuth.js");
const { createCheck, editProductCheck } = require("../middlewares/validator.js");


const router = express.Router();


//vista del formulario de creacion    guestAuth,
router.get("/create", guestAuth, create);
//proceso de creacion del producto
router.post("/create", upload.uploadProd.single('imagen'), createCheck, save);
//vista del producto
router.get('/detail/:id', product);
//vista del formulario de edicion
router.get("/edit/:id", edit);
//proceso de edicion
router.put('/edit/:id', upload.uploadProd.single('imagen'), editProductCheck, update);
//proceso de borrar
router.delete('/delete/:id', destroy);

module.exports = router;