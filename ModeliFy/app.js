const { log } = require('console');
const express = require('express');
const path = require("path");
const app = express();
const port = 3000;

const indexRouter = require("./routes/index.routes");
const usersRoutes = require('./routes/users.routes');
const productsRoutes = require('./routes/products.routes');

// console.log(path.join(__dirname,'public'));

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
// app.set("products", path.join(__dirname, "products"));

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'public')));

// console.log(path.join(__dirname,'views', 'home.html'));

//home
app.use("/",indexRouter);
app.use("/users", usersRoutes);
app.use("/detail", productsRoutes);
// app.use("/create", indexRouter);


// vista del producto
app.get('/detail',(req,res)=>{
    res.render('products/detail');
});

// vista del carrito
app.get('/cart',(req,res)=>{
    res.render('cart.ejs');
});

// vista de nuevo producto
app.get('/create',(req,res)=>{
    res.render('products/create');
});




app.listen(port, ()=>console.log("Servidor corriendo en el puerto: http://localhost:" + port))