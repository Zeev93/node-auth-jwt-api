const router = require('express').Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController')

router.post('/register', 
    // Validaciones
    [
        check('name', 'You must type a name').not().isEmpty().trim(),
        check('email', 'You must enter a valid email').isEmail(),
        check('password', 'Your password must have more than 6 caracteres.').isLength({min:6})
    ],
    // Se manda llamar el controler 
    authController.createUser
)

router.post('/login', 
    [
        check('email', 'You must enter a valid email').isEmail(),
        check('password', 'Your password must have more than 6 caracteres.').isLength({min:6})
    ],
    authController.loginUser
)


module.exports = router
