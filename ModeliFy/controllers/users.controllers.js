const fs = require("fs");
const path = require("path");

const usersPath = path.join(__dirname, '..', 'data', 'users.json');
const bcryptjs = require('bcryptjs');

const usersControllers = {
    getLogin:(req,res)=>{
        res.render('../views/users/login');
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
            avatar: 'default.png'
        }
        users.push(newUser);
        fs.writeFileSync(usersPath, JSON.stringify(users, null, " "));
        res.redirect('/');
    },
    getProfile:(req,res)=>{
        res.render('../views/users/profile');
    }
}

module.exports = usersControllers;
