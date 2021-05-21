const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' })
const URI = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.xecvr.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

const connectDB = async () => {
   try {       
    await mongoose.connect( URI, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
      })
        console.log('Database Connected')
        
   } catch (error) {
        console.log(error)
        process.exit(1); // Detener la App
   }
      
}

module.exports = connectDB;

