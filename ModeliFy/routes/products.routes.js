const express = require("express");
const { product } = require("../controllers/products.controllers");

const router = express.Router();

//vista del detalle del producto DINAMICO
router.get("/detail", product);
//vista del formulario de creacion
// router.get("/add",);
//Proceso de creacion
// router.post("/add/:id",);

module.exports = router;