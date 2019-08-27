const mongoose = require('mongoose')
// const config = require('config')

const db = process.env.MONGODB_URI;


const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log("The goose is connected")
    } catch (err) {
        console.error("The goose is cooked", err.message)
        process.exit(1)
    }
}

module.exports = connectDB;



