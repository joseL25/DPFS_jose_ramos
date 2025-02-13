const express = require('express');
const methodOverride = require("method-override");
const path = require("path");
const app = express();
const port = 3000;

const indexRouter = require("./routes/index.routes");
const usersRoutes = require('./routes/users.routes');
const productsRoutes = require('./routes/products.routes');

// ejs config
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

//Setea carpeta publica o estatica
app.use(express.static(path.join(__dirname, 'public')));

//config form
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));



app.use("/",indexRouter);
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
// app.use("/create", indexRouter);

// vista del carrito
app.get('/cart',(req,res)=>{
    res.render('cart.ejs');
});





app.listen(port, ()=>console.log("Servidor corriendo en el puerto: http://localhost:" + port))