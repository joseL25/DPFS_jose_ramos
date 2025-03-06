const fs = require("fs");
const path = require("path");

const usersPath = path.join(__dirname, '..', 'data', 'users.json');
const bcryptjs = require('bcryptjs');

const usersControllers = {
    getLogin:(req,res)=>{
        res.render('../views/users/login');
    },
    processLogin:(req,res)=>{
        let users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
        let userToLogin = users.find((user)=> user.email == req.body.email);
        if(userToLogin){
            let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if(passwordOk){
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                if(req.body.rememberme == "on"){
                    res.cookie('email', userToLogin.email,{maxAge:(60*1000)*60});
                }
                res.redirect('/users/profile');
            }
        }
        else{
            console.log("los datos ingresados son incorrectos");
            return res.redirect('/users/login');
            
        }
        
    },
    getRegister:(req,res)=>{
        res.render('../views/users/register');
    },
    processRegister:(req,res)=>{
        let users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));

        let newUser = {
            id: users.length + 1,
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 8),
            avatar: req.file?.filename || 'default.png'
        }
        users.push(newUser);
        fs.writeFileSync(usersPath, JSON.stringify(users, null, " "));
        res.redirect('/');
    },
    getProfile:(req,res)=>{
        res.render('../views/users/profile', {user: req.session.userLogged});
    },
    editProfile:(req,res)=>{
        res.render('../views/users/editProfile');
    },
    logout:(req,res)=>{
        res.clearCookie('email');
        req.session.destroy();
        res.redirect('/');
    }
}

module.exports = usersControllers;
