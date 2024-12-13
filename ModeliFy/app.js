const { log } = require('console');
const express = require('express');
const path = require("path");
const app = express();
const port = 3000;

console.log(path.join(__dirname,'public'));

app.use(express.static(path.join(__dirname,'public')));
console.log(path.join(__dirname,'views', 'home.html'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views', 'home.html')); 
});

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'views', 'login.html'));
});

app.get('/product',(req,res)=>{
    res.sendFile(path.join(__dirname,'views', 'productNotFree.html'));
});

app.get('/cart',(req,res)=>{
    res.sendFile(path.join(__dirname,'views', 'product-soporte.html'));
});




app.listen(port, ()=>console.log("Servidor corriendo en el puerto: https://localhost:" + port))