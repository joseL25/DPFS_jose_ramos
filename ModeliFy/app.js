const express = require('express');
const methodOverride = require("method-override");
const path = require("path");
const app = express();
const session = require("express-session");
const cookieParser = require('cookie-parser')


const port = 3000;

//LOGS de las peticiones
// const morgan = require('morgan');
// app.use(morgan('tiny'));

const indexRouter = require("./routes/index.routes");
const usersRoutes = require('./routes/users.routes');
const productsRoutes = require('./routes/products.routes');
const userLogged = require('./middlewares/userLogged');
// const { title } = require('process');

// ejs config
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

//Setea carpeta publica o estatica
app.use(express.static(path.join(__dirname, 'public')));

//session
app.use(session({secret: "Esto es un SECRETO", saveUninitialized:true, resave:true}));
//cookie
app.use(cookieParser());

//config form
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));


//userLogged
app.use(userLogged);


app.use("/",indexRouter);
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);
// app.use("/create", indexRouter);

// vista del carrito
app.get('/cart',(req,res)=>{
    res.render('cart.ejs');
});

app.use(function(req,res){
    res.status(404).render('not-found.ejs', {title:'VISTA NO ENCONTRADA'})
});




app.listen(port, ()=>console.log("Servidor corriendo en el puerto: http://localhost:" + port))