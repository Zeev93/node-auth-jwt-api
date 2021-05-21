const User = require('../models/User')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Registrar Usuario
exports.createUser = async (req, res) => {

    const errores = validationResult(req)

    // Verificar validaciones
    if (!errores.isEmpty()) {
        return res.status(400).json({ error: errores.array()[0] })
    }

    const { name, email, password } = req.body
    const userVerify = await User.findOne( { email: email } )

    // Verificar si email existe
    if (userVerify){
        return res.status(400).json( { error : { msg: 'Email already exists' }});
    }

    // hash pwd

    const salt = await bcrypt.genSalt(10)
    const password_encrypt = await bcrypt.hash(password, salt)
    
    const user = new User({
        name,
        email,
        password: password_encrypt
    })
    
    try {
        const userDB = await user.save()
        res.json({
            error: null,
            data: userDB
        })
    
    } catch (error) {
        res.status(400).json(error)
    }

}

exports.loginUser = async (req, res) => {
    const errores = validationResult(req)

    // Verificar validaciones
    if (!errores.isEmpty()) {
        return res.status(400).json({ error: errores.array()[0]})
    }

    const { email, password } = req.body

    // Validar si el usuario existe
    const user = await User.findOne( { email: email } )
    if (!user) return res.status(400).json( { error: { msg: "User not found" } })

    // Validar password
    const passValidate = await bcrypt.compare(password, user.password)
    if (!passValidate) return res.status(400).json( { error: { msg: "Incorrect password" } })

    // Crear token auth
    const token = jwt.sign ({
        name: user.name,
        id: user._id
    }, process.env.TOKEN_SECRET )

    res.header('auth-token', token).json({
        error: {},
        data: {token}
    })
}
