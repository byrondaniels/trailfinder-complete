const express = require('express')
const connectDB = require('./config/db')
// The following is added for when we are ready to push to production
const path = require('path')
//

const app = express();
connectDB()

// Fun fact - bodyparser is now included with express
app.use(express.json({ extended: false }))

// Define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/shared', require('./routes/api/shared'))

// Another line added for production (needs to be added below routes as well
// Serve static assets in production

if (process.env.NODE_ENV === 'production') {

    // Set static folder:
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('server started on port ', PORT))