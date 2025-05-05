const fs = require("fs");
const path = require("path");
const { validationResult } = require('express-validator');

const bcryptjs = require('bcryptjs');

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
            const resultValidator = validationResult(req);
            if(resultValidator.isEmpty()){
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
            } else{
                return res.render('../views/users/register',{
                    errors: resultValidator.mapped(), old: req.body,
                });
            }
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
        try {
            let userFound = await db.User.findByPk(req.params.id);
            const resultValidator = validationResult(req);
            if(resultValidator.isEmpty()){
                // let users = JSON.parse(fs.readFileSync(usersPath,'utf-8'));
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
            } else{
                return res.render('../views/users/editProfile',{
                    errors: resultValidator.mapped(), 
                    old: req.body, 
                    user: userFound
                });
            }
        } catch (error) {
            console.log(error);
            
        }
    },
    destroy: async(req,res)=>{
        //1. eliminar la imagen
        let userToDelete = await db.User.findByPk(req.params.id);
        if (userToDelete.avatar != "default.png") {
            fs.unlinkSync(path.join(__dirname,`../public/images/avatar/profiles/${userToDelete.avatar}`));
        }
        
        await db.User.destroy({
            where:{
                id:req.params.id
            }
        })
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
    },
    // adminP:(req,res)=>{
    //     res.render('../views/users/adminP')
    // }
}

module.exports = usersControllers;
