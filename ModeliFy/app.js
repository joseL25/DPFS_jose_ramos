const { log } = require('console');
const express = require('express');
const path = require("path");
const app = express();
const port = 3000;

const indexRouter = require("./routes/index.routes");
const usersRoutes = require('./routes/users.routes');

// console.log(path.join(__dirname,'public'));

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname,'public')));
// console.log(path.join(__dirname,'views', 'home.html'));

//home
app.use("/",indexRouter);
app.use("/users", usersRoutes);


// vista del producto
app.get('/product',(req,res)=>{
    res.render('product.ejs');
});

// vista del carrito
app.get('/cart',(req,res)=>{
    res.render('cart.ejs');
});

// vista de nuevo producto
app.get('/new-product',(req,res)=>{
    res.render('addProduct.ejs');
});




app.listen(port, ()=>console.log("Servidor corriendo en el puerto: http://localhost:" + port))