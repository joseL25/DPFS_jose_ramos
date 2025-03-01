const usersControllers = {
    getLogin:(req,res)=>{
        res.render('../views/users/login');
    },
    getRegister:(req,res)=>{
        res.render('../views/users/register');
    },
    getProfile:(req,res)=>{
        res.render('../views/users/profile');
    }
}

module.exports = usersControllers;
