const express = require('express')
const routes = require('./routes/api')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// connect to mongoDB
mongoose.connect('mongodb://localhost/developers')
mongoose.Promise = global.Promise

// set up express App
const app = express()

// middleware to serve static files
app.use(express.static('public'))

app.use(bodyParser.json())
// initialise routes
app.use('/api', routes)

// error handling middleware
app.use(function (err, req, res, next) {
  res.status(422).send({error: err.message})
})

// listen for requests
app.listen(process.env.port || 3000, function () {
  console.log('Now for listening for requests')
})
