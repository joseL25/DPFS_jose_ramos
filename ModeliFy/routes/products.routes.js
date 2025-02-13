const express = require("express");
const { product, 
        create, 
        edit, 
        save,
        update,
        destroy } = require("../controllers/products.controllers");
// const path = require("path");
// const multer = require("multer");
const upload = require("../middlewares/multer.js");


const router = express.Router();


//vista del formulario de creacion
router.get("/create", create);
//proceso de creacion del producto
router.post("/create", upload.uploadProd.single('imagen'), save);
//vista del producto
router.get('/detail/:id', product);
//vista del formulario de edicion
router.get("/edit/:id", edit);
//proceso de edicion
router.put('/edit/:id', upload.uploadProd.single('imagen'), update);
//proceso de borrar
router.delete('/delete/:id', destroy);

module.exports = router;