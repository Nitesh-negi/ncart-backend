const express = require('express');
const app = express();
const morgan = require('morgan')
const mongoose = require('mongoose')

const userRoutes = require('./api/routes/users');
const bodyParser = require('body-parser');

mongoose.connect(process.env.DB_URI);

app.use(morgan('common'))
app.use(bodyParser.json())

// Handling CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({})
    }
    next()
})

app.use('/user', userRoutes)

module.exports = app
