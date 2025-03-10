const { check } = require('express-validator');

const loginCheck = [
    check('email')
    .notEmpty().withMessage('Debes ingresar un Email')
    .isEmail().withMessage('Debes ingresar un Email valido').bail(),
    check('password').notEmpty().withMessage('Debes ingresar un Password').bail()
]

module.exports = {loginCheck};