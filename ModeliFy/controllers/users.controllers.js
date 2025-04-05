const fs = require("fs");
const path = require("path");
const { validationResult } = require('express-validator');

const usersPath = path.join(__dirname, '..', 'data', 'users.json');
const bcryptjs = require('bcryptjs');
const User = require("../services/user");
const db = require('../database/models')

const usersControllers = {
    getLogin:(req,res)=>{
        res.render('../views/users/login');
    },
    processLogin: async(req,res)=>{
        try {
            const resultValidator = validationResult(req);
            if(resultValidator.isEmpty()){
                // let users = User.findAll();
                let userToLogin = await db.User.findOne({
                    where:{
                        email: req.body.email
                    }
                });
                if(userToLogin){
                    let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
                    if(passwordOk){
                        delete userToLogin.password;
                        req.session.userLogged = userToLogin;
                        if(req.body.rememberme == "on"){
                            res.cookie('email', userToLogin.email,{maxAge:(60*1000)*60});
                        }
                        return res.redirect('/users/profile');
                    } else{
                        return res.render('../views/users/login',{
                            errors: {
                                password: {
                                    msg: 'Las credenciales son invalidas',
                                },
                                // old: req.body,
                            },
                            old: req.body,
                        });
                    }
                } else{
                    // console.log("los datos ingresados son incorrectos");
                    return res.render('../views/users/login',{
                        errors: {
                            password: {
                                msg: 'Las credenciales son invalidas',
                            },
                            old: req.body,
                        },
                    });
                }
            } else{
                return res.render('../views/users/login',{
                    errors: resultValidator.mapped(), old: req.body,
                });
            }
        } catch (error) {
            console.log(error);
            
        }

        
    },
    getRegister:(req,res)=>{
        res.render('../views/users/register');
    },
    processRegister: async(req,res)=>{
        // let users = User.findAll();
        try {
            let newUser = {
                // id: users.length + 1,
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, 8),
                avatar: req.file?.filename || 'default.png',
                role: 0
            }
            // users.push(newUser);
            // fs.writeFileSync(usersPath, JSON.stringify(users, null, " "));
            await db.User.create(newUser)
            res.redirect('/');
        } catch (error) {
            console.log(error); 
        }
    },
    getProfile:(req,res)=>{
        res.render('../views/users/profile', {user: req.session.userLogged});
    },
    editProfile: async(req,res)=>{
        try {
            let userFound = await db.User.findByPk(req.params.id);
            // let userFound = User.findById(req.params.id);
            if(userFound){
                return res.render('../views/users/editProfile',{ user: userFound });
            }
            res.status(404).render('not-found.ejs', {title:'USUARIO NO ENCONTRADO'});
        } catch (error) {
            console.log(error);
            
        }
    },
    processUpdate: async(req,res)=>{
        // let users = JSON.parse(fs.readFileSync(usersPath,'utf-8'));
        let userFound = await db.User.findByPk(req.params.id);
        userFound = {
            ...userFound,
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password == "" ? userFound.password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file?.filename || userFound.avatar
        }

        await db.User.update(userFound,{
            where:{ id: req.params.id }
        })
        
        
        // fs.writeFileSync(usersPath, JSON.stringify(users,null, " "));
        req.session.userLogged = userFound;
        res.redirect('/');
    },
    destroy:(req,res)=>{
        //1. eliminar la imagen
        let userToDelete = User.findById(req.params.id);
        if (userToDelete.avatar != "default.png") {
            fs.unlinkSync(path.join(__dirname,`../public/images/avatar/profiles/${userToDelete.avatar}`));
        }
        //2. actualizar el listado excluyendo el que coincide con el id a eliminar
        users = users.filter((user) => user.id != req.params.id);
        //3. reescribir el json
        fs.writeFileSync(usersPath, JSON.stringify(users,null," "));
        //4. Limpiar sesion y cookies
        res.clearCookie('email');
        req.session.destroy();
        //5. redireccionar
        res.redirect('/');
    },
    logout:(req,res)=>{
        res.clearCookie('email');
        req.session.destroy();
        res.redirect('/');
    }
}

module.exports = usersControllers;
