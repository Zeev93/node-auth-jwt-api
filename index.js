const express = require('express')
const bodyparser = require('body-parser')
require ('dotenv').config()
const connectDB = require('./config/db')

const app = express()

// capturar body
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

// Conexion BD
connectDB()


// Routes Middleware
const authorized = require('./middleware/validate-token')

// Routes
app.use ('/api/user', require('./routes/auth'))

// Cualquier ruta para el auth
app.use ('/api/dashboard', authorized, require('./routes/dashboard'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server Port: ${PORT}`)
})
