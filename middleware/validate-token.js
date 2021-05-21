const jwt = require('jsonwebtoken')

// Middleware to validate token

module.exports = (req, res, next) => {
    const token = req.header('auth-token')
    if ( !token ) return res.status(401).json( { error: { msg: "Accesso Denegado " } } )

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next ()
    } catch (error) {
        res.status(400).json({ error: {msg: 'Token no valido' } })
    }
}
 
