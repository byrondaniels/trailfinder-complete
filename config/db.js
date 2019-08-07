const mongoose = require('mongoose')
const config = require('config')

const db = config.get('mongoURI')

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false

        })
        console.log("The goose is connected")
    } catch (err) {
<<<<<<< HEAD
        console.error("The goose is cooked", err.message)
=======
        console.error(err.message)
>>>>>>> 8ed282e71425a9873233f885dc2b5c417bfc710e
        process.exit(1)
    }
}

<<<<<<< HEAD
module.exports = connectDB;



=======
module.exports = connectDB; 
>>>>>>> 8ed282e71425a9873233f885dc2b5c417bfc710e
