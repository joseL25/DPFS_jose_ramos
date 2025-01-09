const { log } = require('console');
const express = require('express');
const path = require("path");
const app = express();
const port = 3000;

// console.log(path.join(__dirname,'public'));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')));
// console.log(path.join(__dirname,'views', 'home.html'));

app.get('/',(req,res)=>{
    res.render(path.join(__dirname,'views', 'home.ejs')); 
});

app.get('/login',(req,res)=>{
    res.render(path.join(__dirname,'views', 'login.ejs'));
});

app.get('/product',(req,res)=>{
    res.render(path.join(__dirname,'views', 'product.ejs'));
});

app.get('/cart',(req,res)=>{
    res.render(path.join(__dirname,'views', 'cart.ejs'));
});

app.get('/new-product',(req,res)=>{
    res.render(path.join(__dirname,'views', 'addProduct.ejs'));
});




app.listen(port, ()=>console.log("Servidor corriendo en el puerto: http://localhost:" + port))