const usersControllers = {
    getLogin:(req,res)=>{
        res.render('../views/users/login');
    },
    getRegister:(req,res)=>{
        res.render('../views/users/register');
    }
}

module.exports = usersControllers;
